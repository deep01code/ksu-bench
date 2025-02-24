package sa.edu.ksubench.mapper;


import org.mapstruct.*;
import sa.edu.ksubench.DTO.GeneralDTOs.ActorDTO;
import sa.edu.ksubench.DTO.GeneralDTOs.ProjectDTO;
import sa.edu.ksubench.DTO.GeneralDTOs.RunDTO;
import sa.edu.ksubench.DTO.GeneralDTOs.StepDTO;
import sa.edu.ksubench.model.core.Project;
import sa.edu.ksubench.model.actor_domain.user.Actor;
import sa.edu.ksubench.model.core.Run;
import sa.edu.ksubench.model.core.Step;

@Mapper(componentModel = "spring",unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface GlobalMapper {

    //...After creating any model
    // -add dto
    // -add updateObjectFromDTO
    // -add getObjectFromDTO



///Actor==========================================================================================
@Mappings({
            @Mapping(target="username", ignore = true),
            @Mapping(target="customerProjects", ignore = true),

    })
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateActorFromDTO(ActorDTO dto, @MappingTarget Actor actor);
    Actor getActorFromDTO(ActorDTO dto);
///==========================================================================================


///Project==========================================================================================
    @Mappings({
            @Mapping(target="id", ignore = true),
            @Mapping(target="customer", ignore = true),
            @Mapping(target="runs", ignore = true),

    })
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateProjectFromDTO(ProjectDTO dto, @MappingTarget Project project);
    Project getProjectFromDTO(ProjectDTO dto);
///==========================================================================================


///Run==========================================================================================
    @Mappings({
            @Mapping(target="id", ignore = true),
            @Mapping(target="project", ignore = true),
            @Mapping(target="steps", ignore = true),

    })
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateRunFromDTO(RunDTO dto, @MappingTarget Run run);
    Run getRunFromDTO(RunDTO dto);
///==========================================================================================


///Step==========================================================================================
/*    @Mappings({
            @Mapping(target="id", ignore = true),
            @Mapping(target="run", ignore = true),

    })
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateStepFromDTO(StepDTO dto, @MappingTarget Step step);
    Step getStepFromDTO(StepDTO dto);*/
///==========================================================================================



}
