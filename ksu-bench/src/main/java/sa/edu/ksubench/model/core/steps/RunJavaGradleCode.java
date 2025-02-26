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

        String cmd = String.format(
                "docker run -d --name java-spark-job-%s --network spark-network-%s --label run_id=%s " +
                        "-v \"%s\":/app --workdir /app deep01code/ksubench-java-ping-app " +
                        "sh -c 'java --add-opens java.base/sun.nio.ch=ALL-UNNAMED -DclusterName=%s -DmasterPort=7077 -jar /app/build/libs/*.jar'",
                runId, runId, runId, tempProjectDir, sparkMasterName, sparkMasterPort
        );

        System.out.println("Final command: " + cmd);

        new Thread(() -> stepService.executeStep(this, cmd, "")).start();


























































/*        // Step 2: Capture logs in a separate thread
        new Thread(() -> stepService.executeStep(this, String.format(
                "docker logs -f java-spark-job-%s", runId
        ), "")).start();*/

        System.out.println("Java Spark job executed with Spark Master: spark://" + sparkMasterName + ":" + sparkMasterPort);
        System.out.println("Project root directory: " + projectDir);
        System.out.println("Docker container java-spark-job-" + runId + " started (NOT auto-removed).");
    }
}
