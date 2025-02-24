package sa.edu.ksubench.model.core.steps;

import lombok.Data;
import org.springframework.transaction.annotation.Transactional;
import sa.edu.ksubench.model.core.Step;
import sa.edu.ksubench.service.workflow.StepService;
import sa.edu.ksubench.utilities.BeanUtil;

import javax.persistence.Entity;


@Entity
@Data
public class CreateDir extends Step {


    @Override
    @Transactional
    public void execute() {
        StepService stepService = BeanUtil.getBean(StepService.class); // Injected by Spring
        String workDir = "/Users/yasser/temp/" + this.getRun().getProject().getId() + "/" + this.getRun().getId();
        System.out.println("Attempting to create directory: " + workDir);

        stepService.executeStep(this, "mkdir -p " + workDir,workDir);
    }
}