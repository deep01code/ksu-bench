package sa.edu.ksubench.model.core.steps;

import lombok.Data;
import sa.edu.ksubench.model.core.Step;
import sa.edu.ksubench.service.workflow.StepService;
import sa.edu.ksubench.utilities.BeanUtil;

import javax.persistence.Entity;

@Entity
@Data
public class GitFetchStep extends Step {


    @Override
    public void execute() {
        StepService stepService = BeanUtil.getBean(StepService.class); // Injected by Spring
        String workDir = "/Users/yasser/temp/" + this.getRun().getProject().getId() + "/" + this.getRun().getId();
        stepService.executeStep(this, "cd " + workDir+ " && git clone " + this.getRun().getProject().getGitURL(),workDir);
    }
}
