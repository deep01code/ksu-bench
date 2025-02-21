package sa.edu.ksubench.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sa.edu.ksubench.model.core.Run;

@Repository
public interface RunRepository extends JpaRepository<Run, Long> {
}
