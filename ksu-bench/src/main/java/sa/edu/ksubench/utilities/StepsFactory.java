package sa.edu.ksubench.utilities;

import sa.edu.ksubench.model.core.Step;
import sa.edu.ksubench.model.core.steps.*;
import sa.edu.ksubench.model.lookup.ClusterType;
import sa.edu.ksubench.model.lookup.ProjectType;

import java.util.LinkedList;
import java.util.List;

public class StepsFactory {

    public static List<Step> createSteps(ProjectType projectType, ClusterType clusterType) {
        List<Step> stepsList = new LinkedList<>();

        // Add technology-specific steps
        if (projectType.equals(ProjectType.JAVA_GRADLE)) {
            stepsList.add(new CreateDir());
            stepsList.add(new GitFetchStep());
            stepsList.add(new SecurityCheck());
            stepsList.add(new JavaGradleBuild());
            stepsList.add(new CodeTest());
            if(clusterType.equals(ClusterType.SPARK)){
                stepsList.add(new CreateSparkClusters());
            }
            stepsList.add(new RunJavaGradleCode());
        }




        return stepsList;
    }
}
