package sa.edu.ksubench.model.core.steps;

import lombok.Data;
import sa.edu.ksubench.model.core.Step;
import sa.edu.ksubench.service.workflow.StepService;
import sa.edu.ksubench.utilities.BeanUtil;

import javax.persistence.Entity;

@Entity
@Data
public class JavaGradleBuild extends Step {

    private String breed;

    @Override
    public void execute() {

        String command=" gradle build";
        StepService stepService = BeanUtil.getBean(StepService.class); // Injected by Spring
//        String workDir = "/Users/yasser/temp/" + this.getRun().getProject().getId() + "/" + this.getRun().getId();

        //workdir is for git clone
        stepService.executeStep(this, "cd " + this.getRun().getRootDirName()+ " && "+command,"");

    }
}
