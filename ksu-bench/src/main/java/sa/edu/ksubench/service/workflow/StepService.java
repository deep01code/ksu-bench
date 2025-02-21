package sa.edu.ksubench.service.workflow;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sa.edu.ksubench.model.core.Step;
import sa.edu.ksubench.model.lookup.StepStatus;
import sa.edu.ksubench.repo.StepRepository;
import sa.edu.ksubench.utilities.FileUtility;

import java.io.BufferedReader;
import java.io.InputStreamReader;

@Service
public class StepService {

    @Autowired
    StepRepository stepRepository;





    @Transactional
    public void executeStep(Step step, String command) {

        try{
            step.setStatus(StepStatus.RUNNING);
            stepRepository.saveAndFlush(step); // ✅ Persist before execution

            System.out.println("Executing step: " + step.getName());

            StringBuilder output = new StringBuilder();

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
                String logFilePath = FileUtility.saveToFile(output, step.getRun());
                step.setLogDataFilePath(logFilePath);

                // ✅ Set status based on exit code and save to DB
                step.setStatus(exitCode == 0 ? StepStatus.SUCCESS : StepStatus.FAILED);
                stepRepository.saveAndFlush(step);

            } catch (Exception e) {
                step.setStatus(StepStatus.FAILED);
                stepRepository.saveAndFlush(step); // ✅ Save failure state
                System.err.println("Error executing script: " + e.getMessage());
            }

        }catch (Exception e) {
            System.out.println("Error executing script: " + e.getMessage());
        }

    }
}
