package sa.edu.ksubench.model.core.steps;

import lombok.Data;
import sa.edu.ksubench.model.core.Run;
import sa.edu.ksubench.model.core.Step;
import sa.edu.ksubench.repo.RunRepository;
import sa.edu.ksubench.service.workflow.StepService;
import sa.edu.ksubench.utilities.BeanUtil;

import javax.persistence.Entity;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@Data
public class RunJavaGradleCode extends Step {

    @Override
    public void execute() {
        StepService stepService = BeanUtil.getBean(StepService.class);
        RunRepository runRepository = BeanUtil.getBean(RunRepository.class);

        // Fetch the RUN instance
        Run fetchedRun = runRepository.findById(this.getRun().getId()).orElse(null);
        if (fetchedRun == null || fetchedRun.getClusterName() == null || fetchedRun.getClusterPort() == null || fetchedRun.getRootDirName() == null) {
            System.err.println("ERROR: Missing required Spark Master or project directory info!");
            return;
        }

        // Retrieve Spark Master info & project root dir
        String runId = String.valueOf(fetchedRun.getId());
        String sparkMasterName = fetchedRun.getClusterName();
        String sparkMasterPort = fetchedRun.getClusterPort();
        String projectDir = fetchedRun.getRootDirName();

        // ✅ Step 1: Start Java Spark Job (Non-blocking execution)

        /*

        docker run --rm \
    --network spark-network \
    -v /path/to/fetched-project:/app \
    gradle:jdk11 \
    bash -c "cd /app && gradle run | tee /app/logs/user-output.log"

        * */





        String tempProjectDir = this.getRun().getRootDirName();
        String parentDir = tempProjectDir + "/.."; // Parent directory
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd-HH.mm.ss"));
        String logFileName = String.format("RunJavaGradleCode-%s.txt", timestamp);

        new Thread(() -> stepService.executeStep(this, String.format(
                "docker run -d --name java-spark-job-%s --network spark-network-%s " +
                        "--label run_id=%s " +
                        " -v \"%s\":/app " +
                        " -v \"%s\":/logs " +
                        " --workdir /app " +
                        "gradle:latest " +
                        "bash -c ' " +
                        "mkdir -p /app || { echo \"[ERROR] Failed to create /app!\"; exit 1; }; " +
                        "cd /app || { echo \"[ERROR] Unable to enter /app directory! Exiting.\"; exit 1; }; " +
                        "echo \"[INFO] Listing /app contents...\"; ls -lah /app; " +
                        "if [ ! -f build.gradle ]; then echo \"[ERROR] build.gradle not found! Exiting.\"; exit 1; fi; " +
                        "JAVA_VERSION=$(sed -n \"s/.*languageVersion.set(JavaLanguageVersion.of(\\([0-9]\\+\\))).*/\\1/p\" build.gradle || echo 11); " +
                        "export JAVA_HOME=$(jrunscript -e \"java.lang.System.out.println(System.getProperty(\\\"java.home\\\"));\" 2>/dev/null || echo ''); " +
                        "echo \"[INFO] Detected JAVA_HOME: $JAVA_HOME\"; " +
                        "echo \"[INFO] Running Gradle build...\"; " +
                        "gradle clean build || { echo \"[ERROR] Gradle build failed! Exiting.\"; exit 1; }; " +
                        "JAR_FILE=$(find build/libs -type f -name \"*.jar\" | head -n 1); " +
                        "if [ ! -f \"$JAR_FILE\" ]; then echo \"[ERROR] No JAR file found! Exiting.\"; exit 1; fi; " +
                        "MAIN_CLASS=$(grep -rl 'public static void main' src/main/java | head -n 1 | sed 's|src/main/java/||;s|.java||;s|/|.|g'); " +
                        "if [ -z \"$MAIN_CLASS\" ]; then echo \"[ERROR] No main class found! Exiting.\"; exit 1; fi; " +
                        "echo \"[INFO] Found Main Class: $MAIN_CLASS\"; " +
                        "echo \"[INFO] Found JAR: $JAR_FILE, executing...\"; " +
                        "exec java -DclusterName=%s -DmasterPort=%s -cp \"$JAR_FILE\" \"$MAIN_CLASS\" | tee /logs/%s '",
                runId, runId, runId, tempProjectDir, parentDir, sparkMasterName, sparkMasterPort, logFileName
        ), "")).start();











/*        // Step 2: Capture logs in a separate thread
        new Thread(() -> stepService.executeStep(this, String.format(
                "docker logs -f java-spark-job-%s", runId
        ), "")).start();*/

        System.out.println("Java Spark job executed with Spark Master: spark://" + sparkMasterName + ":" + sparkMasterPort);
        System.out.println("Project root directory: " + projectDir);
        System.out.println("Docker container java-spark-job-" + runId + " started (NOT auto-removed).");
    }
}
