package sa.edu.ksubench.service.workflow;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sa.edu.ksubench.model.core.Step;
import sa.edu.ksubench.model.core.steps.GitFetchStep;
import sa.edu.ksubench.model.lookup.StepStatus;
import sa.edu.ksubench.repo.RunRepository;
import sa.edu.ksubench.repo.StepRepository;
import sa.edu.ksubench.utilities.FileUtility;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;

@Service
public class StepService {

    @Autowired
    StepRepository stepRepository;
    @Autowired
    private RunRepository runRepository;


    @Transactional
    public void executeStep(Step step, String command, String workDir) {

        try{
            step.setStatus(StepStatus.RUNNING);
            stepRepository.saveAndFlush(step); // ✅ Persist before execution

            System.out.println("Executing step: " + step.getId());

            StringBuilder output = new StringBuilder();

            System.out.println("command: " + command);
            try {
                ProcessBuilder builder = new ProcessBuilder("bash", "-c", command);
                builder.redirectErrorStream(true);
                Process process = builder.start();

                BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
                String line;
                while ((line = reader.readLine()) != null) {
                    output.append(line).append("\n");
                    System.out.println(line);
                }

                int exitCode = process.waitFor();

                // Save logs to a file and store file path
                String logFilePath = FileUtility.saveToFile(output, step.getRun(),step);
                step.setLogDataFilePath(logFilePath);

                // ✅ Set status based on exit code and save to DB
                step.setStatus(exitCode == 0 ? StepStatus.SUCCESS : StepStatus.FAILED);
                stepRepository.saveAndFlush(step);


                if(exitCode==0 && StepStatus.SUCCESS.equals(step.getStatus()) && step.getClass().equals(GitFetchStep.class)) {
                    String rootDirName=findClonedRepoRootFile(workDir);
                    step.getRun().setRootDirName(rootDirName);
                    runRepository.saveAndFlush(step.getRun());
                }

            } catch (Exception e) {
                step.setStatus(StepStatus.FAILED);
                stepRepository.saveAndFlush(step); // ✅ Save failure state
                System.err.println("Error executing script: " + e.getMessage());
            }

        }catch (Exception e) {
            System.out.println("Error executing script: " + e.getMessage());
        }

    }

    private static String findClonedRepoRootFile(String workDir) throws IOException, InterruptedException {
        // Run `find . -name ".git" -type d | head -n 1 | xargs dirname`
        // This finds the first `.git` folder and gets its parent directory (repo root)
       // String command = "cd "+workDir+" && find . -maxdepth 2 -type d -name .git | head -n 1 | xargs dirname";
        String command = "cd " + workDir + " && find . -maxdepth 2 -type d -name .git | head -n 1 | xargs dirname | xargs realpath";

        ProcessBuilder processBuilder = new ProcessBuilder("bash", "-c", command);


        Process process = processBuilder.start();
        BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));

        String output = reader.readLine(); // Get first line of output
        process.waitFor();

        return output != null ? output : "";
    }

}
