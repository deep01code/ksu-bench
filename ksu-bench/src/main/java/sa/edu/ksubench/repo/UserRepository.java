package sa.edu.ksubench.repo;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sa.edu.ksubench.model.actor_domain.account.UserAccount;

@Repository
public interface UserRepository extends JpaRepository<UserAccount,String> {

    UserAccount findByUsername(String username);
}
