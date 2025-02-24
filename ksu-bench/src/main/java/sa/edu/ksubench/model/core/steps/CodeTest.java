package sa.edu.ksubench.model.core.steps;

import lombok.Data;
import sa.edu.ksubench.model.core.Step;
import sa.edu.ksubench.model.lookup.StepStatus;
import sa.edu.ksubench.service.workflow.StepService;
import sa.edu.ksubench.utilities.BeanUtil;

import javax.persistence.Entity;

@Entity
@Data
public class CodeTest extends Step {

    private String breed;

    @Override
    public void execute() {
/*
        String workDir="/temp/".concat(this.getRun().getProject().getId().toString()).concat("/").concat(this.getRun().getProject().getId().toString());

        this.setStatus(StepStatus.RUNNING); // Mark step as running
        System.out.println("Executing git step: ");

        StringBuilder output = new StringBuilder();

        try {
            // Start the process using bash
            ProcessBuilder builder = new ProcessBuilder("bash", "-c", command);
            builder.redirectErrorStream(true); // Merge stdout and stderr
            Process process = builder.start();

            // Capture logs
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line).append("\n"); // Append output to log
                System.out.println(line); // Print log in real-time (Optional)
            }

            int exitCode = process.waitFor(); // Wait for script execution to complete

            // Save logs to StepLog entity
            StepLog log = new StepLog();
            log.setStep(step);
            log.setLogData(output.toString());

            // Determine success or failure
            if (exitCode == 0) {
                step.setStatus("SUCCESS");
                System.out.println("Script executed successfully.");
            } else {
                step.setStatus("FAILED");
                System.out.println("Script failed with exit code: " + exitCode);
            }

        } catch (Exception e) {
            step.setStatus("FAILED");
            System.err.println("Error executing script: " + e.getMessage());
        }*/


        String command=" gradle test";
        StepService stepService = BeanUtil.getBean(StepService.class); // Injected by Spring
//        String workDir = "/Users/yasser/temp/" + this.getRun().getProject().getId() + "/" + this.getRun().getId();

        //workdir is for git clone
        stepService.executeStep(this, "cd " + this.getRun().getRootDirName()+ " && "+command,"");

    }
}
