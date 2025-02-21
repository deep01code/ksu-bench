package sa.edu.ksubench.repo;


import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sa.edu.ksubench.model.core.Project;
import sa.edu.ksubench.model.actor_domain.user.Actor;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project,Long> {

/*

      List<Subscription> findAllByProductAndSubscriptionStatus(Product product, SubscriptionStatus subscriptionStatus, Pageable pageable);

      List<Subscription> findAllByCustomerAndSubscriptionStatus(Actor actor, SubscriptionStatus subscriptionStatus);

      boolean existsByCustomerAndProduct(Actor actor, Product product);

      Subscription findByCustomerAndProduct(Actor actor, Product product);

      List<Subscription> findAllByCustomer(Actor actor, Pageable pageable);

*/

      List<Project> findAllByCustomer(Actor actor, Pageable pageable);




//    List<Subscription> findAllByNutritionistAndSubscriptionStatus(Actor actor, SubscriptionStatus subscriptionStatus,Pageable pageable);

}
