package sa.edu.ksubench.controller;



import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.*;
import sa.edu.ksubench.DTO.GeneralDTOs.ActorDTO;
import sa.edu.ksubench.DTO.GeneralDTOs.ProjectDTO;
import sa.edu.ksubench.mapper.GlobalMapper;
import sa.edu.ksubench.model.core.Project;
import sa.edu.ksubench.model.actor_domain.account.Role;
import sa.edu.ksubench.model.actor_domain.account.UserAccount;
import sa.edu.ksubench.model.actor_domain.user.Actor;
import sa.edu.ksubench.model.actor_domain.user.ActorType;
import sa.edu.ksubench.model.actor_domain.user.CallStatus;
import sa.edu.ksubench.model.actor_domain.user.RegistrationType;
import sa.edu.ksubench.repo.ActorRepository;
import sa.edu.ksubench.repo.ProjectRepository;
import sa.edu.ksubench.repo.UserRepository;
import sa.edu.ksubench.service.CustomerService;
import sa.edu.ksubench.service.SharedFunctionsService;

import java.util.*;

@RestController
public class CustomerController {
    private  final Logger LOGGER = LogManager.getLogger(getClass().getName());

    @Autowired
    private UserRepository userRepository;

    @Autowired
    ActorRepository actorRepository;


    @Autowired
    CustomerService customerService;


/*    @Autowired
    PriceRepository priceRepository;*/


    @Autowired
    ProjectRepository projectRepository;



    GlobalMapper globalMapper = Mappers.getMapper(GlobalMapper.class);


    @Autowired
    SharedFunctionsService sharedFunctionsService;

    //...done
    @PostMapping("/register-customer")
    public ResponseEntity<String> registerCustomer(@RequestBody ActorDTO actorDTO){
        Actor actor = globalMapper.getActorFromDTO(actorDTO);

        if(userRepository.existsById(actor.getUsername())){
            return   ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        UserAccount userAccount = new UserAccount();
        userAccount.setUsername(actor.getUsername());

        userAccount.setPassword(new BCryptPasswordEncoder().encode(actorDTO.getPassword())); //2

        userAccount.setAccountNonExpired(true);
        userAccount.setAccountNonLocked(true);
        userAccount.setCredentialsNonExpired(true);
        userAccount.setEnabled(true);
        Role role=new Role();
        role.setRoleName("ROLE_USER");
        ArrayList<Role> roles=new ArrayList<>();
        roles.add(role);
        userAccount.setRoles(roles);
        actor.setRegistrationType(RegistrationType.ACCEPTED);
        actor.setActorType(ActorType.USER);
        actor.setCallStatus(CallStatus.IDLE);
        userRepository.save(userAccount); // create auth account
        actorRepository.save(actor);      // create app account

        return   ResponseEntity.status(HttpStatus.OK).build();

    }



    //todo get projects
    @GetMapping("/get-customer-projects")
    public List<Project> getCustomerProjects(OAuth2Authentication user, Pageable pageable){

        Actor actor=actorRepository.findByUsername(user.getPrincipal().toString());
        return   projectRepository.findAllByCustomer(actor,pageable);

    }

    //todo create project
    @PostMapping("/create-project")
    public ResponseEntity<String> subscribeRequest(OAuth2Authentication user,@RequestBody ProjectDTO projectDTO){

        return customerService.createProjectRequest(user,projectDTO);
    }

    //todo run a task
/*
    //...done
    @GetMapping("/get-accepted-nutritionists")
    public List<Actor> getAcceptedNutritionists(Pageable pageable){
        return actorRepository.findAllByActorTypeAndRegistrationType(ActorType.NUTRITIONIST, RegistrationType.ACCEPTED,pageable);
    }

    //...done
    @GetMapping("/get-random-accepted-nutritionists")
    public List<Actor> getRandomAcceptedNutritionists(){
        Pageable sortedByRegistrationDateDesc =PageRequest.of(0, 3, Sort.by("registrationDate").descending());
        return actorRepository.findAllByActorTypeAndRegistrationType(ActorType.NUTRITIONIST,RegistrationType.ACCEPTED,sortedByRegistrationDateDesc);
    }

    //...done
    @GetMapping("/search-nutritionist")
    public List<Actor> searchNutritionist(@RequestParam String search, Pageable pageable){
        if(search==null || search.equals("")){
            return actorRepository.findAllByActorTypeAndRegistrationType(ActorType.NUTRITIONIST,RegistrationType.ACCEPTED,pageable);
        }
        return actorRepository.findAllByActorTypeAndRegistrationTypeAndNameContainingIgnoreCase(ActorType.NUTRITIONIST,RegistrationType.ACCEPTED,search,pageable);
    }


    //...done
    @GetMapping("/get-proxy")
    public ResponseEntity<Map<String,String>> getSecret(){

//        String proxy="c2tfdGVzdF9IYUtIRzk0WGFmb0xGcWJYcng2S0N0dXZzRnlqcDZ3VEtTNzVRN0cyOg==";
        String proxy= LookupValueUtility.getPaymentKey();

        Map<String,String> data=new HashMap<>();
        data.put("proxy",proxy);
        return new ResponseEntity<>(data,HttpStatus.OK);
    }


    //...done
    @GetMapping("/get-customer-subscriptions")
    public List<Subscription> getCustomerSubscriptions(OAuth2Authentication user, Pageable pageable){

        Actor actor=actorRepository.findByUsername(user.getPrincipal().toString());
        return   subscriptionRepository.findAllByCustomer(actor,pageable);

    }


    //...done
    @PostMapping("/can-customer-subscribe-to-rateplan")
    public boolean canCustomerSubscribeToProduct(OAuth2Authentication user,@RequestBody RatePlanDTO ratePlanDTO){

        Actor customer = actorRepository.findByUsername(user.getPrincipal().toString());
        RatePlan ratePlan =ratePlanRepository.findById(ratePlanDTO.getId()).get();
        if(customer==null || ratePlan==null){ throw new NoSuchElementException();}

        return   sharedFunctionsService.canCustomerSubscribeToProduct(customer,ratePlan);

    }

    //...done
    @PostMapping("/subscribe-request")
    public ResponseEntity<String> subscribeRequest(OAuth2Authentication user,@RequestBody RatePlanDTO ratePlanDTO){

        Actor customer = actorRepository.findByUsername(user.getPrincipal().toString());
        RatePlan ratePlan= ratePlanRepository.findById(ratePlanDTO.getId()).get();
        return customerService.subscribeRequest(customer,ratePlan);
    }

    //...done
    @PostMapping("/refund-subscription")
    public ResponseEntity<?> refundSubscription(@RequestBody SubscriptionDTO subscriptionDTO){
        return customerService.refundSubscription(subscriptionDTO);
    }

    //...done
    @GetMapping("/payment-verification")
    public ResponseEntity subscriptionActivation(@RequestParam String id, @RequestParam String status,@RequestParam String message,@RequestParam String subscriptionId){

        return customerService.subscriptionActivation(id,status,message,subscriptionId);
    }


    @PostMapping("/add-favourite-nutritionist")
    public void addFavouriteNutritionist(OAuth2Authentication user,@RequestBody Actor actor){
        customerService.addFavouriteNutritionist(user,actor);
    }

    @PostMapping("/remove-favourite-nutritionist")
    public void removeFavouriteNutritionist(OAuth2Authentication user,@RequestBody Actor actor){
        customerService.removeFavouriteNutritionist(user,actor);
    }

    @GetMapping("/get-my-favourite-nutritionists")
    public List<Actor> getMyFavouriteNutritionists(OAuth2Authentication user,Pageable pageable){
        return customerService.getMyFavouriteNutritionists(user,pageable);
    }


    @PostMapping("/is-nutritionist-in-my-favourites")
    public boolean isNutritionistInMyFavourites(OAuth2Authentication user,@RequestBody Actor actor) {
        return customerService.isNutritionistInMyFavourites(user,actor);
    }


    @PostMapping("/rate-nutritionist")
    public ResponseEntity<?> rateNutritionist(OAuth2Authentication user,@RequestBody RatingDTO ratingDTO) {
      return    customerService.rateNutritionist(user,ratingDTO);
    }*/


}
