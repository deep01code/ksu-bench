package sa.edu.ksubench.model.core.steps;

import lombok.Data;
import sa.edu.ksubench.model.core.Run;
import sa.edu.ksubench.model.core.Step;
import sa.edu.ksubench.repo.RunRepository;
import sa.edu.ksubench.service.workflow.StepService;
import sa.edu.ksubench.utilities.BeanUtil;

import javax.persistence.Entity;
import java.io.BufferedReader;
import java.io.InputStreamReader;

@Entity
@Data
public class CreateSparkClusters extends Step {


    @Override
    public void execute() {
        StepService stepService = BeanUtil.getBean(StepService.class); // Injected by Spring
        RunRepository runRepository = BeanUtil.getBean(RunRepository.class); // Injected by Spring

        // Get the RUN ID from JPA
        String RUN_ID = String.valueOf(this.getRun().getId());

        // Define unique container and network names per RUN ID
        String networkName = "spark-network-" + RUN_ID;
        String sparkMasterName = "spark-master-" + RUN_ID;
        String sparkWorkerName = "spark-worker-" + RUN_ID;

        // Step 1: Create a unique network and tag it with RUN_ID
        stepService.executeStep(this, String.format(
                "docker network create --label run_id=%s %s", RUN_ID, networkName
        ), "");

        // Step 2: Start Spark Master (Let OS assign ports dynamically) with RUN_ID label
        stepService.executeStep(this, String.format(
                "docker run -d --name %s --hostname %s --network %s --label run_id=%s -p 0:7077 -p 0:8080 bitnami/spark:latest spark-class org.apache.spark.deploy.master.Master",
                sparkMasterName, sparkMasterName, networkName, RUN_ID
        ), "");
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // Step 3: Capture the actual assigned ports from Docker
        String sparkMasterPort = getDockerPort(sparkMasterName, "7077");
        String sparkUIPort = getDockerPort(sparkMasterName, "8080");

        // Step 4: Start Spark Worker (Connect to the correct Spark Master) with RUN_ID label
        stepService.executeStep(this, String.format(
                "docker run  -d --name %s --hostname %s --network %s --label run_id=%s bitnami/spark:latest spark-class org.apache.spark.deploy.worker.Worker spark://%s:%s",
                sparkWorkerName, sparkWorkerName, networkName, RUN_ID, sparkMasterName, sparkMasterPort
        ), "");
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // Print assigned ports to console
        System.out.println("Spark Master assigned port: " + sparkMasterPort);
        System.out.println("Spark UI assigned port: " + sparkUIPort);



        //save the dynamic ifnormation
        Run fetchedRun=runRepository.findById(this.getRun().getId()).orElse(null);

        fetchedRun.setClusterName(sparkMasterName);
        fetchedRun.setClusterPort(sparkMasterPort);
        runRepository.save(fetchedRun);

    }

    // Method to get the dynamically assigned port from Docker
    private String getDockerPort(String containerName, String internalPort) {
        try {
            Process process = new ProcessBuilder("docker", "port", containerName, internalPort).start();
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String output = reader.readLine(); // Example output: "0.0.0.0:49153"
            if (output != null && output.contains(":")) {
                return output.split(":")[1].trim();
            }
        } catch (Exception e) {
            System.err.println("Failed to get port for " + containerName + ":" + internalPort);
        }
        return "UNKNOWN";
    }
}
