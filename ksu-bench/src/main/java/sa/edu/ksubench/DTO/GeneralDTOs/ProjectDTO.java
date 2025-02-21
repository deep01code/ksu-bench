package sa.edu.ksubench.DTO.GeneralDTOs;

import lombok.Data;
import sa.edu.ksubench.model.lookup.ClusterType;
import sa.edu.ksubench.model.lookup.ProjectType;

@Data
public class ProjectDTO {

    Long id;
    String name, description,gitURL;
    ProjectType projectType; // "java", "python", etc.
    ClusterType clusterType; // "spark", "hadoop", etc.


}
