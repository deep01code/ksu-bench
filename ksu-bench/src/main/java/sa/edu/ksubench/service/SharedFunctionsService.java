package sa.edu.ksubench.service;

/*import com.mustajal.micro.DTO.GeneralDTOs.ArticleDTO;
import com.mustajal.micro.DTO.GeneralDTOs.ShareDTO;
import com.mustajal.micro.DTO.GeneralDTOs.SubscriptionDTO;
import com.mustajal.micro.beans.FcmBean;
import com.mustajal.micro.mapper.GlobalMapper;
import com.mustajal.micro.model.actor_domain.user.Actor;
import com.mustajal.micro.model.network_domain.notification.NotificationType;
import com.mustajal.micro.model.payment_domain.PaymentTransaction;
import com.mustajal.micro.model.payment_domain.earning.ShareType;
import com.mustajal.micro.model.sales_domain.rateplan.RatePlan;
import com.mustajal.micro.model.sales_domain.subscription.Subscription;
import com.mustajal.micro.model.sales_domain.subscription.SubscriptionStatus;
import com.mustajal.micro.model.social_domain.article.Article;
import com.mustajal.micro.repo.*;
import com.mustajal.micro.utilities.LookupValueUtility;*/
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.client.RestTemplate;

import javax.transaction.Transactional;
import java.util.*;
import java.util.concurrent.atomic.AtomicBoolean;

@Service
public class SharedFunctionsService {
    private  final Logger LOGGER = LogManager.getLogger(getClass().getName());
/*
    @Autowired
    SubscriptionRepository subscriptionRepository;


    @Autowired
    RatePlanRepository ratePlanRepository;

    @Autowired
    FcmBean fcmBean;

    @Autowired
    PaymentRepository paymentRepository;

    @Autowired
    ArticleRepository articleRepository;

    GlobalMapper globalMapper = Mappers.getMapper(GlobalMapper.class);



    public boolean canCustomerSubscribeToProduct(Actor customer, RatePlan ratePlan){

        AtomicBoolean result= new AtomicBoolean(true);
        if(customer==null || ratePlan==null){ throw new NoSuchElementException();}

        if(subscriptionRepository.existsByCustomerAndRatePlan(customer,ratePlan)){

            List<Subscription> subscriptions=subscriptionRepository.findByCustomerAndRatePlan(customer,ratePlan);
            subscriptions.forEach( subscription ->{
                if(     subscription.getSubscriptionStatus()== SubscriptionStatus.pending ||
                        subscription.getSubscriptionStatus()==SubscriptionStatus.accepted||
                        subscription.getSubscriptionStatus()==SubscriptionStatus.active
                ){
                    /// there is a subscription for this user and he should not subscribe again
                    result.set(false);
                }

            });


        }else{
            result.set(true);
        }

        return result.get();

    }

    public boolean isRefundableSubscription(Subscription subscription){
        boolean result=true;
        if(        subscription==null
                || subscription.getId()==null
        ){throw new NoSuchElementException("subscription is null");}

        if(subscription.getSubscriptionStatus()!=SubscriptionStatus.active){
            return false;
        }
        Calendar refundCalendar=Calendar.getInstance();
        refundCalendar.setTime(subscription.getRefundTimeoutDate());
        Calendar currentTimeCalendar=Calendar.getInstance();
        boolean isRefundDatePassed= currentTimeCalendar.after(refundCalendar);

        if(! subscription.isRefundable() || isRefundDatePassed){
            result=false;
        }

        return result;
    }


    public List<RatePlan> getNutritionistRatePlans(Actor actor){
        return ratePlanRepository.findAllByNutritionistAndSealableIsTrue(actor);
    }

    //for user
    public List<ShareDTO> getGeneralShares(){

        List<ShareDTO> shareDTOs=new ArrayList<>();

        ShareDTO vatShare=new ShareDTO();
        vatShare.setShareType(ShareType.VAT_SHARE);
        vatShare.setValue(Double.parseDouble(LookupValueUtility.getVatPercentage()));

        ShareDTO nutritionistShare = new ShareDTO();
        nutritionistShare.setShareType(ShareType.NUTRITION_SHARE);
        nutritionistShare.setValue(Double.parseDouble(LookupValueUtility.getNutritionistPercentage()));

        ShareDTO appShare=new ShareDTO();
        appShare.setShareType(ShareType.APP_SHARE);
        appShare.setValue(Double.parseDouble(LookupValueUtility.getAppPercentage()));

        shareDTOs.add(vatShare);
        shareDTOs.add(nutritionistShare);
        shareDTOs.add(appShare);

        return shareDTOs;
    }

    public String getEmailSupport(){ return LookupValueUtility.getSupportEmail(); }


    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public ResponseEntity<?> cancelAndRefundSubscriptionByAdminAndNutritionist(SubscriptionDTO subscriptionDTO){

        ResponseEntity responseEntity=null;
        Subscription dbSubscription=subscriptionRepository.findById(subscriptionDTO.getId()).get();
        if(dbSubscription==null){throw new NoSuchElementException();}
*//*
        if(!isRefundableSubscription(dbSubscription)){ throw new RuntimeException("not refundable subscription ");}
*//*

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
            fcmBean.sendNotification(dbSubscription.getCustomer().getUsername(),"BalanceIt","subscription with "+dbSubscription.getNutritionist().getName()+" canceled",data,false);

            responseEntity= new ResponseEntity("canceled subscription", HttpStatus.OK);

        }catch (Exception exception){
            exception.printStackTrace();
            LOGGER.info(exception.toString());
            responseEntity= new ResponseEntity("error canceled subscription", HttpStatus.BAD_REQUEST);

        }


        return responseEntity;
    }

    @Transactional
    public ResponseEntity<?> upsertArticle(@RequestBody ArticleDTO articleDTO){
        Article article=new Article();
        try{
            if(articleDTO.getId()==null){
                globalMapper.updateArticleFromDTO(articleDTO,article);
               article=articleRepository.save(article);
            }else {

                Article dbArticle= articleRepository.findById(articleDTO.getId()).get();
                if(dbArticle==null){ throw new NoSuchElementException();}

                globalMapper.updateArticleFromDTO(articleDTO,dbArticle);
                article=dbArticle;
            }

        }catch (Exception e){
            LOGGER.info(e.toString());
            // e.printStackTrace();
        }

        return new  ResponseEntity<Article>(article,HttpStatus.OK);

    }*/

}
