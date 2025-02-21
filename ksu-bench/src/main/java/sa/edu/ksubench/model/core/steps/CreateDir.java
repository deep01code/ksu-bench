package sa.edu.ksubench.model.core.steps;

import lombok.Data;
import sa.edu.ksubench.model.core.Step;
import sa.edu.ksubench.service.workflow.StepService;

import javax.persistence.Entity;


@Entity
@Data
public class CreateDir extends Step {

    private transient StepService stepService; // Injected by Spring

    @Override
    public void execute() {

        String workDir="/temp/".concat(this.getRun().getProject().getId().toString()).concat("/").concat(this.getRun().getProject().getId().toString());
        stepService.executeStep(this, "mkdir -p " + workDir);
    }
}