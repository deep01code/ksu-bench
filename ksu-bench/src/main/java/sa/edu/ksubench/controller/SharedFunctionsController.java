package sa.edu.ksubench.controller;

/*import com.mustajal.micro.DTO.GeneralDTOs.ActorDTO;
import com.mustajal.micro.DTO.GeneralDTOs.ArticleDTO;
import com.mustajal.micro.DTO.GeneralDTOs.ShareDTO;
import com.mustajal.micro.DTO.GeneralDTOs.SubscriptionDTO;
import com.mustajal.micro.mapper.GlobalMapper;
import com.mustajal.micro.model.actor_domain.account.UserAccount;
import com.mustajal.micro.model.actor_domain.user.Actor;
import com.mustajal.micro.model.lookup.Terms;
import com.mustajal.micro.model.sales_domain.rateplan.RatePlan;
import com.mustajal.micro.model.sales_domain.rateplan.product.Product;
import com.mustajal.micro.model.sales_domain.subscription.Subscription;
import com.mustajal.micro.model.social_domain.article.Article;
import com.mustajal.micro.repo.ActorRepository;
import com.mustajal.micro.repo.ArticleRepository;
import com.mustajal.micro.repo.TermsRepository;
import com.mustajal.micro.repo.UserRepository;
import com.mustajal.micro.service.AdminService;
import com.mustajal.micro.service.SharedFunctionsService;
import com.mustajal.micro.utilities.SMS;*/
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
//import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.trace.http.HttpTrace;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.*;


@RestController
public class SharedFunctionsController {
    private  final Logger LOGGER = LogManager.getLogger(getClass().getName());


/*    @Autowired
    private UserRepository userRepository;

    @Autowired
    ActorRepository actorRepository;

    @Autowired
    ArticleRepository articleRepository;

    @Autowired
    TermsRepository termsRepository;

    @Autowired
    AdminService adminService;

    @Autowired
    SharedFunctionsService sharedFunctionsService;

    GlobalMapper globalMapper = Mappers.getMapper(GlobalMapper.class);


    @PostMapping("/get-otp")
    public ResponseEntity<String> OTP(@RequestBody UserAccount userAccount) {
        //System.out.println(userAccount);

        if (!userRepository.existsById(userAccount.getUsername())) {
            return ResponseEntity.status(HttpStatus.OK).build();
        }
        UserAccount user = userRepository.findByUsername(userAccount.getUsername());
        String tempPass="";
        //System.err.println(user.getUsername());
        tempPass = String.format("%04d", new Random().nextInt(10000));
        ArrayList<String> demoAccounts=new ArrayList<>();
        demoAccounts.add("+966531048000");
        demoAccounts.add("+966560877788");
        demoAccounts.add("+966557814906");
        demoAccounts.add("+966558714392");
        if(demoAccounts.contains(user.getUsername())){

            tempPass = String.format("%04d", 0000);
            user.setPassword(new BCryptPasswordEncoder().encode(tempPass));
            UserAccount result = userRepository.save(user);
            return ResponseEntity.ok("OTP Sent Successfully to :" + result.getUsername().toString());

        }

        user.setPassword(new BCryptPasswordEncoder().encode(tempPass));
        UserAccount result = userRepository.save(user);
        SMS.send2(result.getUsername(), tempPass);


        return ResponseEntity.ok("OTP Sent Successfully to :" + result.getUsername().toString());
    }


    @GetMapping("/users")
    public ResponseEntity<List<UserAccount>> getUsers() {

        return ResponseEntity.ok(userRepository.findAll());
    }

    @GetMapping("/authorities")
    public Map<String,Object> user(OAuth2Authentication user, HttpTrace.Principal principal){


        Actor actor=actorRepository.findByUsername(user.getPrincipal().toString());

        Map<String ,Object> userInfo= new HashMap<>();
        userInfo.put("authorities", AuthorityUtils.authorityListToSet(user.getUserAuthentication().getAuthorities()));
        userInfo.put("actor",actor);



        return userInfo;
    }


    @PostMapping("/update-actor")
    public ResponseEntity<?> updateActor(@RequestBody ActorDTO actor){


        if (!userRepository.existsById(actor.getUsername())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }


        try {
            Actor dbActor= actorRepository.findByUsername(actor.getUsername());

            globalMapper.updateActorFromDTO(actor,dbActor);
            actorRepository.save(dbActor);

        }catch (Exception e){
           // e.printStackTrace();
            LOGGER.info(e.toString());

        }

        return ResponseEntity.ok().build();

    }

    @PostMapping("/get-product")
    public Product getProduct(@RequestBody Actor actor){
       // System.err.println("Actor is recevied ...");

        if (!userRepository.existsById(actor.getUsername())) {
            return null;
        }

        Product product=null;
        try {
          // product= actorRepository.findByUsername(actor.getUsername()).getProduct();

        }catch (Exception e){
            LOGGER.info(e.toString());
            // e.printStackTrace();
        }

        return product;
    }

    @GetMapping("/get-articles")
    public List<Article> getArticles(){

        Pageable sortedByPostDateDesc =
                PageRequest.of(0, 3, Sort.by("postDate").descending());

        return articleRepository.findAll(sortedByPostDateDesc).toList();
    }


    //..done
    @PostMapping("/add-articles")
    public ResponseEntity<?> upsertArticle(@RequestBody ArticleDTO articleDTO){
        return sharedFunctionsService.upsertArticle(articleDTO);
    }


    @GetMapping("/get-terms")
    public List<Terms> getTerms(){

        Pageable sortedByPostDateDesc =
                PageRequest.of(0, 1, Sort.by("creationDate").descending());
        return termsRepository.findAll(sortedByPostDateDesc).toList();
    }


    @PostMapping("/add-terms")
    public ResponseEntity<String> addArticle(@RequestBody Terms terms){

        try{
            termsRepository.save(terms);
        }catch (Exception e){
            LOGGER.info(e.toString());
            //e.printStackTrace();
        }
        return   ResponseEntity.status(HttpStatus.OK).build();

    }


    //.. 5-8-2021


    //...done
    @PostMapping("/nutritionist-plans")
    public ResponseEntity<?> getNutritionistRatePlans(@RequestBody Actor actor){
        Actor dbActor=actorRepository.findByUsername(actor.getUsername());
        if(dbActor==null){throw new NoSuchElementException();}
        return new ResponseEntity<List<RatePlan>>(sharedFunctionsService.getNutritionistRatePlans(dbActor),HttpStatus.OK);
    }


    //...done
    @GetMapping("/shares")
    public ResponseEntity<?> getShares(){
        return new ResponseEntity<List<ShareDTO>>(sharedFunctionsService.getGeneralShares(),HttpStatus.OK);
    }

    //...done
    @GetMapping("/support-email")
    public String getSupportEmail(){ return sharedFunctionsService.getEmailSupport();}


    //...done
    @PostMapping("/cancel-and-refund-subscription")
    public ResponseEntity<?> refundSubscription(@RequestBody SubscriptionDTO subscriptionDTO){
        return sharedFunctionsService.cancelAndRefundSubscriptionByAdminAndNutritionist(subscriptionDTO);
    }


    @PostMapping("/is-refundable-subscription")
    public boolean isRefundableSubscription(@RequestBody Subscription subscription){
        return sharedFunctionsService.isRefundableSubscription(subscription);
    }*/
}




