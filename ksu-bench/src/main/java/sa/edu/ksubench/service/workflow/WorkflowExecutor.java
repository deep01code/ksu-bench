package sa.edu.ksubench.service.workflow;

import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import sa.edu.ksubench.DTO.GeneralDTOs.ProjectDTO;
import sa.edu.ksubench.DTO.GeneralDTOs.RunDTO;
import sa.edu.ksubench.mapper.GlobalMapper;
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

import javax.transaction.Transactional;

@Service
public class WorkflowExecutor {

    @Autowired
    StepService stepService;

    @Autowired
    RunRepository runRepo;

    @Autowired
    ProjectRepository projectRepository;

    GlobalMapper globalMapper = Mappers.getMapper(GlobalMapper.class);

    //@Transactional
    public void executeRun(ProjectDTO projectDTO) {

        Project project = projectRepository.findById(globalMapper.getProjectFromDTO(projectDTO).getId()).orElse(null);


        Run run = new Run();
        run.setStatus(RunStatus.RUNNING);
        //add RUN to the project
        project.addRun(run);
        //Save and flush Project.
       // projectRepository.saveAndFlush(project);
        //runRepo.saveAndFlush(run);
        //add steps to the RUN
        StepsFactory.createSteps(project.getProjectType(),project.getClusterType()).forEach(step -> {run.addStep(step);});


        // Save again after steps are added
        project=projectRepository.saveAndFlush(project);
       // runRepo.save(run);

        // 🔥 Ensure we have the latest updated Run again
         Run createdRun = runRepo.findFirstByProjectOrderByIdDesc(project);

        //now execute steps.
        executeRunSteps(createdRun);
    }


    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void executeRunSteps(Run run) {

        try {
            run = runRepo.findById(run.getId()).orElseThrow(() -> new RuntimeException("Run not found"));

            boolean successStatus=true;

            for (int i=0; i<run.getSteps().size(); i++) {
                Step step = run.getSteps().get(i);
                step.execute();
                if(step.getStatus().equals(StepStatus.FAILED)) {
                    successStatus=false;
                    break;
                }
            }

            run.setStatus(successStatus ? RunStatus.COMPLETED : RunStatus.FAILED);

            runRepo.saveAndFlush(run);
            System.out.println("Run completed.");
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

    }
}
