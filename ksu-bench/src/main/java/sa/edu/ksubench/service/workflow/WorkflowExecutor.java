package sa.edu.ksubench.service.workflow;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import sa.edu.ksubench.model.core.Project;
import sa.edu.ksubench.model.core.Run;
import sa.edu.ksubench.model.core.Step;
import sa.edu.ksubench.model.lookup.ClusterType;
import sa.edu.ksubench.model.lookup.ProjectType;
import sa.edu.ksubench.model.lookup.RunStatus;
import sa.edu.ksubench.model.lookup.StepStatus;
import sa.edu.ksubench.repo.ProjectRepository;
import sa.edu.ksubench.repo.RunRepository;
import sa.edu.ksubench.utilities.StepsFactory;

@Component
public class WorkflowExecutor {

    @Autowired
    StepService stepService;

    @Autowired
    RunRepository runRepo;

    @Autowired
    ProjectRepository projectRepo;

    public void executeRun(Project project, ProjectType projectType, ClusterType clusterType) {

        Run run = new Run();
        run.setStatus(RunStatus.RUNNING);

        //add steps to the RUN
        StepsFactory.createSteps(projectType,clusterType).forEach(step -> {run.addStep(step);});

        //add RUN to the project
        project.addRun(run);

        //Save and flush Project.
        projectRepo.saveAndFlush(project);


        //now execute steps.

        run.getSteps().forEach(step -> { step.execute();});

        run.setStatus(RunStatus.COMPLETED);
        System.out.println("Run completed.");
    }
}
