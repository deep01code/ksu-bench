package sa.edu.ksubench.utilities;

import sa.edu.ksubench.model.core.Step;
import sa.edu.ksubench.model.lookup.StepStatus;

import java.io.BufferedReader;
import java.io.InputStreamReader;

public class WorkflowUtility {

/*
    public static void execute(Step step, String command){


        step.setStatus(StepStatus.RUNNING); // Mark step as running
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
            String outputFileDir= FileUtility.saveToFile(output,step.getRun());
            step.setLogDataFilePath(outputFileDir);

            // Determine success or failure
            if (exitCode == 0) {
                step.setStatus(StepStatus.SUCCESS);
                System.out.println("Script executed successfully.");
            } else {
                step.setStatus(StepStatus.FAILED);
                System.out.println("Script failed with exit code: " + exitCode);
            }

        } catch (Exception e) {
            step.setStatus(StepStatus.SUCCESS);
            System.err.println("Error executing script: " + e.getMessage());
        }
    }
*/
}
