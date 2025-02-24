package sa.edu.ksubench.model.core;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import sa.edu.ksubench.model.actor_domain.user.Actor;
import sa.edu.ksubench.model.lookup.ClusterType;
import sa.edu.ksubench.model.lookup.ProjectType;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@Entity
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
public class Project implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
     public Long id;

    public String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    public ProjectType projectType; // "java", "python", etc.

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    public ClusterType clusterType; // "spark", "hadoop", etc.

    public String description;

    public String gitURL;

    //todo
    @ManyToOne
    @JsonIgnore
    Actor customer;


    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.EAGER)
    @JsonIgnore
//    @OrderColumn(name = "queue_order") // Ensures order is maintained
    private List<Run> runs=new ArrayList<>();
    public void addRun(Run run){
        runs.add(run);
        run.setProject(this);
    }
    public void removeRun(Run run){
        runs.remove(run);
        run.setProject(null);
    }


    @Override
    public String toString() {
        return "Project{" +
                "id=" + id +
                '}';
    }
}
