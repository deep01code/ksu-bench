package sa.edu.ksubench.model.core;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import sa.edu.ksubench.model.lookup.RunStatus;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;

@Entity
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
public class Run {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;


    @ManyToOne
    public Project project;

    public LocalDateTime startTime;
    public LocalDateTime endTime;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    public RunStatus status; // QUEUED, RUNNING, COMPLETED, FAILED

    public String rootDirName;
    public String clusterName;
    public String clusterPort;

    @OneToMany(mappedBy = "run", cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.EAGER)
    @OrderColumn(name = "queue_order") // Ensures order is maintained
    private List<Step> steps=new LinkedList<>();
    public void addStep(Step step){
        steps.add(step);
        step.setRun(this);
    }
    public void removeStep(Step step){
        steps.remove(step);
        step.setRun(null);
    }

    @PrePersist
    public void setDefaultStatus() {
        if (this.status == null) {
            this.status = RunStatus.QUEUED; // ✅ Set default before saving
        }
    }

    @Override
    public String toString() {
        return "Project{" +
                "id=" + id +
                '}';
    }
}
