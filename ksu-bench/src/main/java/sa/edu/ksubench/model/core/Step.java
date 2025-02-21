package sa.edu.ksubench.model.core;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import sa.edu.ksubench.model.core.steps.*;
import sa.edu.ksubench.model.lookup.StepStatus;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

import javax.persistence.*;

@Entity
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY)
@JsonSubTypes({
        @JsonSubTypes.Type(value = GitFetchStep.class, name = "GitFetchStep"),
        @JsonSubTypes.Type(value = JavaGradleBuild.class, name = "JavaGradleBuild"),
        @JsonSubTypes.Type(value = SecurityCheck.class, name = "SecurityCheck"),
        @JsonSubTypes.Type(value = CodeTest.class, name = "CodeTest"),
        @JsonSubTypes.Type(value = CreateSparkClusters.class, name = "CreateClusters"),
        @JsonSubTypes.Type(value = RunJavaGradleCode.class, name = "RunJavaGradleCode"),
        @JsonSubTypes.Type(value = JavaMavenBuild.class, name = "JavaMavenBuild"),



}
)
@Inheritance
@DiscriminatorColumn(name = "step_type")
public abstract class Step {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;

    @ManyToOne
    private Run run;
    private String name;
    private StepStatus status; // PENDING, RUNNING, SUCCESS, FAILED
    private String logDataFilePath;
    public abstract void execute();

    @PrePersist
    public void setDefaultStatus() {
        if (this.status == null) {
            this.status = StepStatus.PENDING; // ✅ Set default before saving
        }
    }

}


