package sa.edu.ksubench.repo;


import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import sa.edu.ksubench.model.actor_domain.user.Actor;
import sa.edu.ksubench.model.actor_domain.user.ActorType;
import sa.edu.ksubench.model.actor_domain.user.RegistrationType;

import java.util.List;

@Repository
public interface ActorRepository extends JpaRepository<Actor,String> {

    Actor findByUsername(String id);

    List<Actor> findAllByActorType(ActorType actorType, Pageable pageable);

    List<Actor> findAllByActorType(ActorType actorType);

    List<Actor> findAllByActorTypeAndRegistrationType(ActorType actorType, RegistrationType registrationType, Pageable pageable);

    //List<Actor> findAllByTokensContaining(FCMToken fcmToken);

    List<Actor> findAllByActorTypeAndRegistrationTypeAndNameContainingIgnoreCase(ActorType actorType, RegistrationType registrationType,String name,Pageable pageable);


    @Query(value="select * from actor where username IN (select favourite_nutritionists_username as username from actor_favourite_nutritionists where actor_username=:username)",
            countQuery = "select count(*) from (select * from actor where username IN (select favourite_nutritionists_username as username from actor_favourite_nutritionists where actor_username=:username)) as TEMP",
            nativeQuery = true)
    List<Actor> findMyFavouriteNutritionists(@Param("username") String username, Pageable pageable);



}
