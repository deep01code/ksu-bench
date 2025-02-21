package sa.edu.ksubench.model.actor_domain.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
/*import com.mustajal.micro.model.network_domain.fcm.FCMToken;
import com.mustajal.micro.model.network_domain.message.Message;
import com.mustajal.micro.model.network_domain.message.MessagingThread;
import com.mustajal.micro.model.sales_domain.rateplan.RatePlan;
import com.mustajal.micro.model.sales_domain.subscription.Subscription;
import com.mustajal.micro.model.social_domain.post.Comment;
import com.mustajal.micro.model.social_domain.post.Post;*/
import lombok.Data;
import lombok.EqualsAndHashCode;
import sa.edu.ksubench.model.core.Project;

import javax.persistence.*;
import java.util.*;

@Entity
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@EntityListeners(ActorListener.class)
public class Actor {


    @Id
    @EqualsAndHashCode.Include
    private String username;


    @OneToMany(mappedBy = "customer",cascade = CascadeType.ALL)
    @JsonIgnoreProperties(value = {"customer"})
    Set<Project> customerProjects=new HashSet<>();
    public void addCustomerProject(Project project){
        customerProjects.add(project);
        project.setCustomer(this);
    }
    public void removeCustomerProject(Project project){
        customerProjects.remove(customerProjects);
        project.setCustomer(null);
    }

   /* @OneToMany(mappedBy = "customer",cascade = CascadeType.ALL)
    @JsonIgnoreProperties(value = {"nutritionist","customer","ratePlan","paymentTransactions","mealPlans","messagingThread"})
    Set<Subscription> customerSubscriptions=new HashSet<>();
    public void addCustomerSubscription(Subscription subscription){
        customerSubscriptions.add(subscription);
        subscription.setCustomer(this);
    }
    public void removeCustomerSubscription(Subscription subscription){
        customerSubscriptions.remove(subscription);
        subscription.setCustomer(null);
    }

    @OneToMany(mappedBy = "nutritionist" ,cascade = CascadeType.ALL)
    @JsonIgnoreProperties(value = {"nutritionist","customer","ratePlan","paymentTransactions","mealPlans","messagingThread"})
    Set<Subscription> nutritionistSubscriptions=new HashSet<>();
    public void addNutritionistSubscription(Subscription subscription){
        nutritionistSubscriptions.add(subscription);
        subscription.setNutritionist(this);
    }
    public void removeNutritionistSubscription(Subscription subscription){
        nutritionistSubscriptions.remove(subscription);
        subscription.setNutritionist(null);
    }


    @OneToMany(mappedBy = "nutritionist" ,cascade = CascadeType.ALL)
    @JsonIgnoreProperties(value = {"nutritionist", "subscriptions","prices"})
    Set<RatePlan> ratePlans=new HashSet<>();
    public void addRatePlan(RatePlan ratePlan){
        ratePlans.add(ratePlan);
        ratePlan.setNutritionist(this);
    }
    public void removeRatePlan(RatePlan ratePlan){
        ratePlans.remove(ratePlan);
        ratePlan.setNutritionist(null);
    }



    @OneToMany(mappedBy = "actor",cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @Fetch(value = FetchMode.SUBSELECT)
    @JsonIgnore
    Set<FCMToken> tokens=new HashSet<>();
    public void addToken(FCMToken fcmToken){
        tokens.add(fcmToken);
        fcmToken.setActor(this);
    }
    public void removeToken(FCMToken fcmToken){
        tokens.remove(fcmToken);
        fcmToken.setActor(null);
    }

    @OneToMany(mappedBy = "actor",cascade = CascadeType.ALL)
    @JsonIgnore
    Set<Post> posts=new HashSet<>();
    public void addPost(Post post){
        posts.add(post);
        post.setActor(this);
    }
    public void removePost(Post post){
        posts.remove(post);
        post.setActor(null);
    }

    @OneToMany(mappedBy = "actor",cascade = CascadeType.ALL)
    @JsonIgnore
    Set<Comment> comments=new HashSet<>();
    public void addComment(Comment comment){
        comments.add(comment);
        comment.setActor(this);
    }
    public void removeComment(Comment comment){
        comments.remove(comment);
        comment.setActor(null);
    }

    @OneToMany(mappedBy = "from",cascade = CascadeType.ALL)
    @JsonIgnore
    Set<Message> messages=new HashSet<>();
    public void addMessage(Message message){
        messages.add(message);
        message.setFrom(this);
    }
    public void removeMessage(Message message){
        messages.remove(message);
        message.setFrom(null);
    }

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JsonIgnore
    Set<Actor> favouriteNutritionists=new HashSet<>();
    public void addFavouriteNutritionist(Actor actor){
        favouriteNutritionists.add(actor);
    }
    public void removeFavouriteNutritionist(Actor actor){
        if(favouriteNutritionists.contains(actor)){
            favouriteNutritionists.remove(actor);
        }
    }


    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JsonIgnore
    Set<Actor> customersRatingList=new HashSet<>();
    public void addCustomersRatingList(Actor actor){
        customersRatingList.add(actor);
    }


    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JsonIgnore
    Set<MessagingThread> messagingThreads=new HashSet<>();

    @ManyToMany(mappedBy = "readList")
    @JsonIgnore
    Set<Message> readListMessages=new HashSet<>();*/

    private String imgUrl,name,nationalId,email,speciality,medicalHistory,workingHours;

    private String scfhs;

    @Column(columnDefinition="TEXT")
    private String ar_bio;
    @Column(columnDefinition="TEXT")
    private String en_bio;

    @Column(columnDefinition="TEXT")
    private String sdp;
    @Column(columnDefinition="TEXT")
    private String ice;

    public double rate,totalRate,height,weight,neck,chest,biceps,waist,hip,thighs,calves;

    @Column(columnDefinition = "integer default 0")
    long countOfRates;

    @Temporal(TemporalType.TIMESTAMP)
    private Date dateOfBirth;

    @Temporal(TemporalType.TIMESTAMP)
    private Date registrationDate;

    @Enumerated(EnumType.STRING)
    private GenderType genderType;

    @Enumerated(EnumType.STRING)
    private RegistrationType registrationType;

    @Enumerated(EnumType.STRING)
    private ActorType actorType;


    @Enumerated(EnumType.STRING)
    @JsonIgnore
    private CallStatus callStatus;

    @Override
    public String toString() {
        return "Actor{" +
                "username='" + username + '\'' +
                '}';
    }


}
