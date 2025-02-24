package sa.edu.ksubench.model.core.steps;

import lombok.Data;
import sa.edu.ksubench.model.core.Step;
import sa.edu.ksubench.service.workflow.StepService;
import sa.edu.ksubench.utilities.BeanUtil;

import javax.persistence.Entity;
import java.io.BufferedReader;
import java.io.InputStreamReader;

@Entity
@Data
public class ClearDocker extends Step {
    @Override
    public void execute() {
        StepService stepService = BeanUtil.getBean(StepService.class); // Injected by Spring

        // Get RUN_ID from the current step's run instance
        String runId = String.valueOf(this.getRun().getId());

        // Step 1: Find all containers with the RUN_ID label
        String findContainersCmd = String.format("docker ps -aq --filter \"label=run_id=%s\"", runId);
        String containerIds = executeCommand(findContainersCmd);

        if (containerIds == null || containerIds.isEmpty()) {
            System.out.println("No containers found for RUN_ID: " + runId);
            return;
        }

        // Step 2: Stop & Remove the found containers
        String removeContainersCmd = "docker rm -f " + containerIds;
        stepService.executeStep(this, removeContainersCmd, "");

        System.out.println("Removed containers tagged with RUN_ID: " + runId);
    }

    // Helper method to execute a command and return output
    private String executeCommand(String command) {
        try {
            Process process = new ProcessBuilder("bash", "-c", command).start();
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));

            StringBuilder output = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line).append(" ");
            }

            process.waitFor();
            return output.toString().trim();
        } catch (Exception e) {
            System.err.println("Error executing command: " + command);
            return null;
        }
    }
}
