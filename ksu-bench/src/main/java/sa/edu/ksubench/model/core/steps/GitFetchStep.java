package sa.edu.ksubench.model.core.steps;

import lombok.Data;
import sa.edu.ksubench.model.core.Step;

import javax.persistence.Entity;

@Entity
@Data
public class GitFetchStep extends Step {

    private String breed;

    @Override
    public void execute() {

    }
}
