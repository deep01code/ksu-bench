package sa.edu.ksubench.service;


import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.stereotype.Service;
import sa.edu.ksubench.DTO.GeneralDTOs.ProjectDTO;
import sa.edu.ksubench.mapper.GlobalMapper;
import sa.edu.ksubench.model.core.Project;
import sa.edu.ksubench.model.actor_domain.user.Actor;
import sa.edu.ksubench.repo.ActorRepository;
import sa.edu.ksubench.repo.ProjectRepository;

import javax.transaction.Transactional;

@Service
public class CustomerService {

    private  final Logger LOGGER = LogManager.getLogger(getClass().getName());

    @Autowired
    ProjectRepository projectRepository;

    @Autowired
    ActorRepository actorRepository;
   /*

    @Autowired
    RatePlanRepository ratePlanRepository;

    @Autowired
    FcmBean fcmBean;

    @Autowired
    PaymentRepository paymentRepository;*/

    GlobalMapper globalMapper = Mappers.getMapper(GlobalMapper.class);


    @Autowired
    SharedFunctionsService sharedFunctionsService;



    @Transactional
    public ResponseEntity<Object> createProjectRequest(OAuth2Authentication user, ProjectDTO projectDTO) {


        Actor customer= actorRepository.findByUsername(user.getPrincipal().toString());
        if (customer == null ) { throw  new RuntimeException("User not found");}

        Project project = globalMapper.getProjectFromDTO(projectDTO);
        customer.addCustomerProject(project);
        Project result= projectRepository.saveAndFlush(project);  // ✅ Forces Hibernate to persist immediately
        return new ResponseEntity<>(result, HttpStatus.CREATED);

    }
/*
    @Transactional
    public ResponseEntity<String> subscribeRequest(Actor customer,RatePlan ratePlan){
        Subscription subscription = new Subscription();
        if(ratePlan==null||customer==null||!sharedFunctionsService.canCustomerSubscribeToProduct(customer,ratePlan)
        ){ return new ResponseEntity<String>("USER_ALREADY_SUBSCRIBED",HttpStatus.INTERNAL_SERVER_ERROR); }

       //...fetch data and set timeouts
        globalMapper.fetchSubscriptionInfoFromProduct(subscription,ratePlan.getProduct());
        subscription.autoSetTimeoutDateOnRequest();
        subscription.setSubscriptionStatus(SubscriptionStatus.pending);
        subscription.addCustomerAndNutritionistAndRatePlan(customer,ratePlan);


        Map<String,String> data=new HashMap<>();
        data.put("NotificationType", NotificationType.SUBSCRIBE.toString());
        data.put("eventCreator", subscription.getCustomer().getName());
        fcmBean.sendNotification(ratePlan.getNutritionist().getUsername(),"BalanceIt","You have subscription request",data,false);


        return   ResponseEntity.status(HttpStatus.OK).build();

    }

    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public ResponseEntity<?> refundSubscription( SubscriptionDTO subscriptionDTO){

        ResponseEntity responseEntity=null;
        Subscription dbSubscription=subscriptionRepository.findById(subscriptionDTO.getId()).get();
        if(dbSubscription==null){throw new NoSuchElementException();}
        if(!sharedFunctionsService.isRefundableSubscription(dbSubscription)){
            return new ResponseEntity<String>("NOT_REFUNDABLE_SUBSCRIPTION",HttpStatus.INTERNAL_SERVER_ERROR);
            }

        try{
            PaymentTransaction lastPaymentTransaction =paymentRepository.getLastPayment(dbSubscription.getId()+"");
            RestTemplate restTemplate = new RestTemplate();
            String url="https://api.moyasar.com/v1/payments/"+ lastPaymentTransaction.getId()+"/refund";
            HttpHeaders headers = new HttpHeaders();
            String paymentKey= LookupValueUtility.getPaymentKey();
            headers.set("Authorization","basic "+paymentKey);
            HttpEntity entity = new HttpEntity(headers);
            ResponseEntity<PaymentTransaction> responseObj = restTemplate.exchange(url, HttpMethod.POST,entity, PaymentTransaction.class);
            PaymentTransaction paymentTransactionResult = responseObj.getBody();

            dbSubscription.addPaymentTransaction(paymentTransactionResult);
            dbSubscription.setSubscriptionStatus(SubscriptionStatus.refunded);
            subscriptionRepository.saveAndFlush(dbSubscription);



            Map<String,String> data=new HashMap<>();
            data.put("NotificationType", NotificationType.REFUND_SUBSCRIPTION.toString());
            //   data.put("eventCreator", dbSubscription.getActor().getName());
            fcmBean.sendNotification(dbSubscription.getNutritionist().getUsername(),"BalanceIt","subscription with "+dbSubscription.getNutritionist().getName()+" canceled",data,false);

            responseEntity= new ResponseEntity("canceled subscription", HttpStatus.OK);

        }catch (Exception exception){
            //exception.printStackTrace();
            LOGGER.info(exception.toString());
            responseEntity= new ResponseEntity("error canceled subscription", HttpStatus.BAD_REQUEST);

        }


        return responseEntity;
    }


    @Transactional
    public ResponseEntity subscriptionActivation(String id, String status, String message, String subscriptionId){
        ResponseEntity responseEntity;


        if(status.equalsIgnoreCase("paid")){

            RestTemplate restTemplate = new RestTemplate();
            String url="https://api.moyasar.com/v1/payments/"+id;
            HttpHeaders headers = new HttpHeaders();
            String paymentKey= LookupValueUtility.getPaymentKey();
            headers.set("Authorization","basic "+paymentKey);
            HttpEntity entity = new HttpEntity(headers);
            ResponseEntity<PaymentTransaction> responseObj = restTemplate.exchange(url, HttpMethod.GET,entity, PaymentTransaction.class);
            PaymentTransaction paymentTransactionResult = responseObj.getBody();

            if(!paymentTransactionResult.getStatus().equalsIgnoreCase("paid")){ throw new RuntimeException("Payment Error ==> Status is:"+paymentTransactionResult.getStatus()); }

            Subscription subscription=subscriptionRepository.findById(Long.valueOf(subscriptionId)).get();
            subscription.setSubscriptionStatus(SubscriptionStatus.active);
            //...setTimeouts values
            subscription.autoSetTimeoutDateOnActive();
            //...add the paymentTransaction
            subscription.addPaymentTransaction(paymentTransactionResult);
            //...manage shares
            Share vatShare=new Share(subscription.getRatePlan().getPrice(),ShareType.VAT_SHARE);
            Share nutritionistShare=new Share(subscription.getRatePlan().getPrice(),ShareType.NUTRITION_SHARE);
            Share appShare=new Share(subscription.getRatePlan().getPrice(),ShareType.APP_SHARE);
            subscription.addShare(vatShare);
            subscription.addShare(nutritionistShare);
            subscription.addShare(appShare);


            responseEntity= new ResponseEntity(message, HttpStatus.OK);
        }else {

            HttpHeaders headers = new HttpHeaders();
            headers.add("description", message);

            responseEntity= new ResponseEntity(message,headers, HttpStatus.NOT_ACCEPTABLE);
        }
        return responseEntity;
    }



    @Transactional
    public void addFavouriteNutritionist(OAuth2Authentication user, Actor actor){
        Actor customer= actorRepository.findByUsername(user.getPrincipal().toString());
        Actor nutritionist=actorRepository.findByUsername(actor.getUsername());
        if (customer == null || nutritionist == null) { throw  new RuntimeException("User not found");}
        customer.addFavouriteNutritionist(nutritionist);
    }

    @Transactional
    public void removeFavouriteNutritionist(OAuth2Authentication user,Actor actor){
        Actor customer= actorRepository.findByUsername(user.getPrincipal().toString());
        Actor nutritionist=actorRepository.findByUsername(actor.getUsername());
        if (customer == null || nutritionist == null) { throw  new RuntimeException("User not found");}
        customer.removeFavouriteNutritionist(nutritionist);

    }

    @Transactional
    public List<Actor> getMyFavouriteNutritionists(OAuth2Authentication user,Pageable pageable){
        Actor customer= actorRepository.findByUsername(user.getPrincipal().toString());
        if (customer == null) { throw  new RuntimeException("User not found");}
        return actorRepository.findMyFavouriteNutritionists(customer.getUsername(),pageable);
    }


    @Transactional
    public boolean isNutritionistInMyFavourites(OAuth2Authentication user,Actor actor){
        Actor customer= actorRepository.findByUsername(user.getPrincipal().toString());
        Actor nutritionist=actorRepository.findByUsername(actor.getUsername());

        boolean result=customer.getFavouriteNutritionists().contains(nutritionist);
        return result;
    }


    @Transactional
    public ResponseEntity<?> rateNutritionist(OAuth2Authentication user, RatingDTO ratingDTO) {
        //ActorDTO contains nutritionist rate
        Actor customer= actorRepository.findByUsername(user.getPrincipal().toString());
        Actor nutritionist=actorRepository.findByUsername(ratingDTO.getActorDTO().getUsername());
        Subscription dbSubscription=subscriptionRepository.findById(ratingDTO.getSubscription().getId()).get();

        if (customer == null || nutritionist == null ||dbSubscription==null) { return new ResponseEntity<String>("Missing IDs",HttpStatus.INTERNAL_SERVER_ERROR);}

        if(nutritionist.getCustomersRatingList().contains(customer)){ return new ResponseEntity<String>("ALREADY_RATED",HttpStatus.INTERNAL_SERVER_ERROR);}

        if(dbSubscription.getSubscriptionStatus()!=SubscriptionStatus.active){return new ResponseEntity<String>("SUBSCRIPTION_NOT_ACTIVE",HttpStatus.INTERNAL_SERVER_ERROR);}

        nutritionist.setTotalRate(nutritionist.getTotalRate()+ratingDTO.getActorDTO().rate);
        nutritionist.addCustomersRatingList(customer);
        double averageRate= nutritionist.getTotalRate()/nutritionist.getCustomersRatingList().size();
        nutritionist.setRate(averageRate);
        nutritionist.setCountOfRates(nutritionist.getCountOfRates()+1);
        return new ResponseEntity<String>("RATED",HttpStatus.OK);

    }*/

}
