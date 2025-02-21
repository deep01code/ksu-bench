package sa.edu.ksubench.service;
/*
import com.mustajal.micro.DTO.GeneralDTOs.DescriptionItemDTO;
import com.mustajal.micro.DTO.ControllersDTOs.UpsertProductDTO;
import com.mustajal.micro.DTO.GeneralDTOs.ProductDTO;
import com.mustajal.micro.DTO.GeneralDTOs.RatePlanDTO;
import com.mustajal.micro.beans.FcmBean;
import com.mustajal.micro.config.GlobalConstants;
import com.mustajal.micro.exception.UserNotFoundException;
import com.mustajal.micro.mapper.GlobalMapper;
import com.mustajal.micro.model.actor_domain.account.Role;
import com.mustajal.micro.model.actor_domain.account.UserAccount;
import com.mustajal.micro.model.actor_domain.user.Actor;
import com.mustajal.micro.model.actor_domain.user.ActorType;
import com.mustajal.micro.model.actor_domain.user.RegistrationType;
import com.mustajal.micro.model.lookup.LookupValue;
import com.mustajal.micro.model.network_domain.notification.NotificationType;
import com.mustajal.micro.model.sales_domain.rateplan.RatePlan;
import com.mustajal.micro.model.sales_domain.rateplan.product.DescriptionItem;
import com.mustajal.micro.model.sales_domain.rateplan.product.Product;
import com.mustajal.micro.model.sales_domain.subscription.Subscription;
import com.mustajal.micro.model.sales_domain.subscription.SubscriptionStatus;
import com.mustajal.micro.repo.*;
import com.mustajal.micro.utilities.SMS;
import com.mustajal.micro.utilities.SearchSetUtility;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;*/

/*
@Service
*/
public class AdminService {

   /* private  final Logger LOGGER = LogManager.getLogger(getClass().getName());

    @Autowired
    ActorRepository actorRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    RatePlanRepository ratePlanRepository;

*//*    @Autowired
    PriceRepository priceRepository;*//*

    @Autowired
    DescriptionItemRepository descriptionItemRepository;

    @Autowired
    FcmBean fcmBean;

    @Autowired
    LookupValueRepository lookupValueRepository;


    GlobalMapper globalMapper = Mappers.getMapper(GlobalMapper.class);





     @Transactional
     public String acceptNutritionist(Actor actor) throws Exception {
        if(!userRepository.existsById(actor.getUsername())){
           throw new UserNotFoundException();
        }

        UserAccount userAccount = userRepository.findByUsername(actor.getUsername());
        userAccount.setEnabled(true);
        actor.setRegistrationType(RegistrationType.ACCEPTED);

        userRepository.save(userAccount); // create auth account
        actorRepository.save(actor);      // create app account

        Map<String,String> data=new HashMap<>();
        data.put("NotificationType", NotificationType.ACCEPT_NUTRITIONIST.toString());
        fcmBean.sendNotification(actor.getUsername(),"BalanceIt","Congratulations, you request was accepted",data,false);


        SMS.send2(actor.getUsername(), GlobalConstants.SUCCESSFUL_NUTRITIONIST_ACTIVATION);


        return   "OK";
    }

     public String rejectNutritionist(Actor actor) throws Exception {
        if(!userRepository.existsById(actor.getUsername())){
            throw new Exception("User not found");
        }

        UserAccount userAccount = userRepository.findByUsername(actor.getUsername());
        userAccount.setEnabled(false);
        actor.setRegistrationType(RegistrationType.REJECTED);

        userRepository.save(userAccount); // create auth account
        actorRepository.save(actor);      // create app account

        Map<String,String> data=new HashMap<>();
        data.put("NotificationType", NotificationType.REJECT_NUTRITIONIST.toString());
        fcmBean.sendNotification(actor.getUsername(),"BalanceIt","Sorry, you request was rejected",data,false);

        SMS.send2(actor.getUsername(), GlobalConstants.FAILED_NUTRITIONIST_ACTIVATION);

        return "OK";
    }

     public List<Actor> getNutritionists(Pageable pageable){
        return actorRepository.findAllByActorType(ActorType.NUTRITIONIST,pageable);
    }

     public List<Actor> getPendingNutritionists(Pageable pageable){
        return actorRepository.findAllByActorTypeAndRegistrationType(ActorType.NUTRITIONIST,RegistrationType.PENDING,pageable);
    }


    public String registerAdmin(Actor actor) throws UserNotFoundException {
        if(userRepository.existsById(actor.getUsername())){
              throw new UserNotFoundException();
        }

        UserAccount userAccount = new UserAccount();
        userAccount.setUsername(actor.getUsername());
        String tempPass=String.format("%04d", new Random().nextInt(10000));
        userAccount.setPassword(new BCryptPasswordEncoder().encode(tempPass)); //2
        userAccount.setAccountNonExpired(true);
        userAccount.setAccountNonLocked(true);
        userAccount.setCredentialsNonExpired(true);
        userAccount.setEnabled(true);
        Role role=new Role();
        role.setRoleName("ROLE_ADMIN");
        ArrayList<Role> roles=new ArrayList<>();
        roles.add(role);
        userAccount.setRoles(roles);
        actor.setRegistrationType(RegistrationType.ACCEPTED);
        actor.setActorType(ActorType.ADMIN);

        userRepository.save(userAccount); // create auth account
        actorRepository.save(actor);      // create app account

        return "OK";
    }

    //

    //NOTE implementation after 1-8-2021
    //NOTE ratePlan and Description Items not included


    //NOTE this method upsert(insert/update) product and description items
    @Transactional
    public Product upsertProduct(ProductDTO productDTO){
        Product product=new Product();
        //...save new element if not exist
        if(productDTO.getId()==null){

            globalMapper.updateProductFromDTO(productDTO,product);
            product=productRepository.save(product);

        //...if element exist, update parent and children
        }else {

            //...update parent
            Product dbProduct=productRepository.findById(productDTO.getId()).get();
            if(dbProduct==null){throw new NoSuchElementException();}
            globalMapper.updateProductFromDTO(productDTO,dbProduct);
            //end update parent

            //...update children

            product=dbProduct;

        }  //...end


        return product;
    }


    public List<Product> getAllProducts(Pageable pageable){
        return productRepository.findAll(pageable).toList();
    }*/

/*
    public ResponseEntity<?> getLookupValues(){
        return new ResponseEntity<List<LookupValue>>(lookupValueRepository.findAll(),HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<?> upsertLookup( LookupValue lookupValue){
        if(lookupValue.getId()==null){
            lookupValueRepository.save(lookupValue);
        }else {
            LookupValue dbLookupValue=lookupValueRepository.findById(lookupValue.getId()).get();
            if(dbLookupValue!=null){
                dbLookupValue.setValue(lookupValue.getValue());
            }
        }
        return new ResponseEntity(HttpStatus.OK);
    }
*/





}
