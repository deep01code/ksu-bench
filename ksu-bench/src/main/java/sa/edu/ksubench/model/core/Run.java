package sa.edu.ksubench.model.core;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import sa.edu.ksubench.model.lookup.RunStatus;

import javax.persistence.*;
import java.time.LocalDateTime;
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
    private Project project;

    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private RunStatus status; // QUEUED, RUNNING, COMPLETED, FAILED

    @OneToMany(mappedBy = "run", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderColumn(name = "queue_order") // Ensures order is maintained
    private List<Step> steps;
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
}
