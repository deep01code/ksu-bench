package sa.edu.ksubench.service;

/*import com.mustajal.micro.DTO.ControllersDTOs.SignalDTO;
import com.mustajal.micro.DTO.GeneralDTOs.ActorDTO;
import com.mustajal.micro.DTO.GeneralDTOs.SubscriptionDTO;
import com.mustajal.micro.beans.FcmBean;
import com.mustajal.micro.model.actor_domain.user.Actor;
import com.mustajal.micro.model.actor_domain.user.CallStatus;
import com.mustajal.micro.model.network_domain.notification.NotificationType;
import com.mustajal.micro.model.network_domain.signal.SignalErrorType;
import com.mustajal.micro.model.sales_domain.subscription.Subscription;
import com.mustajal.micro.model.sales_domain.subscription.SubscriptionStatus;
import com.mustajal.micro.repo.ActorRepository;
import com.mustajal.micro.repo.SubscriptionRepository;*/
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
public class SignalingService {
    private  final Logger LOGGER = LogManager.getLogger(getClass().getName());

 /*   @Autowired
    ActorRepository actorRepository;

    @Autowired
    SubscriptionRepository subscriptionRepository;

    @Autowired
    FcmBean fcmBean;

    @Autowired
    SignalingService signalingService;

   // GlobalMapper globalMapper = Mappers.getMapper(GlobalMapper.class);

    @Transactional
    public ResponseEntity<?> call(OAuth2Authentication user, SignalDTO signalDTO){
        LOGGER.info("call");
        Actor caller= actorRepository.findByUsername(user.getPrincipal().toString());
        Actor target= actorRepository.findByUsername(signalDTO.getTarget().getUsername());
        Subscription subscription=subscriptionRepository.findById(signalDTO.getSubscription().getId()).get();

        if(target==null || caller==null || subscription==null){
            return new ResponseEntity<SignalErrorType>(SignalErrorType.USER_NOT_FOUND, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if(subscription.getSubscriptionStatus()!=SubscriptionStatus.active){return new ResponseEntity<String>("SUBSCRIPTION_NOT_ACTIVE",HttpStatus.INTERNAL_SERVER_ERROR);}

        if(subscription.getCallMinutes()<2.0){
            return new ResponseEntity<SignalErrorType>(SignalErrorType.NO_SUFFICIENT_BALANCE, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        //...if other user not idle
        if(target.getCallStatus()!= CallStatus.IDLE){
            return new ResponseEntity<SignalErrorType>(SignalErrorType.BUSY, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        //...check balance
        SubscriptionDTO tempSubscriptionDTO=new SubscriptionDTO();
        tempSubscriptionDTO.setId(signalDTO.getSubscription().getId());
        if(!isSubscriptionHaveEnoughBalance(tempSubscriptionDTO)){
            return new ResponseEntity<SignalErrorType>(SignalErrorType.NO_SUFFICIENT_BALANCE, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        //...update caller status AND update target to stop receiving calls
        signalingService.upsertActorState(caller,CallStatus.RINGING);
        signalingService.upsertActorState(target,CallStatus.RINGING);
        signalingService.upsertSubscriptionState(subscription,CallStatus.RINGING);

        //...change the status after 30 sec
        ///add subscription
        ArrayList<Actor> callEndPoints=new ArrayList<>();
        callEndPoints.add(caller);
        callEndPoints.add(target);
        signalingService.ringingTimeout(callEndPoints,subscription);

        //...start ringing on both devices
        sendRingingNotification(caller,target,subscription);
        sendCallOfferNotification(caller,target,subscription);

        return new ResponseEntity<String>("call sent", HttpStatus.OK);
    }


    @Transactional
    public ResponseEntity<?> answerCall(OAuth2Authentication user, SignalDTO signalDTO){
        LOGGER.info("answerCall");
        Actor answerer= actorRepository.findByUsername(user.getPrincipal().toString());
        Actor offerer= actorRepository.findByUsername(signalDTO.getTarget().getUsername());
        Subscription subscription=subscriptionRepository.findById(signalDTO.getSubscription().getId()).get();


        //...update caller status AND update target to stop receiving calls
        signalingService.upsertActorState(answerer,CallStatus.CALLING);
        signalingService.upsertActorState(offerer,CallStatus.CALLING);
        signalingService.upsertSubscriptionState(subscription,CallStatus.CALLING);



        //...start calling, notify offerer and answerer
        sendAnswerNotification(offerer,answerer);

        List<Actor> callers=new ArrayList<>();
        callers.add(offerer);
        callers.add(answerer);

        Thread answeringCallTimeout=new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    Thread.sleep(1800000);
                    Subscription dbSubscription=subscriptionRepository.findById(subscription.getId()).get();
                    if(Thread.currentThread().getId()==dbSubscription.getAnswerThreadId()){
                        signalingService.endCall(callers,subscription);
                    }
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });
        signalingService.setAnswerThreadId(subscription,answeringCallTimeout.getId());

        answeringCallTimeout.start();


        signalingService.charge(offerer,answerer,subscription);

        return new ResponseEntity<String>("call sent", HttpStatus.OK);
    }


    public  ResponseEntity<?> rtcOfferOrAnswerSignal(OAuth2Authentication user,SignalDTO signalDTO){
        LOGGER.info("rtcOfferOrAnswerSignal");
        Actor source= actorRepository.findByUsername(user.getPrincipal().toString());
        Actor target=actorRepository.findByUsername(signalDTO.getTarget().getUsername());
        if(target==null || source==null){
            return new ResponseEntity<SignalErrorType>(SignalErrorType.USER_NOT_FOUND, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if(signalDTO.notificationType==NotificationType.RTC_OFFER){
            Map<String,String> data=new HashMap<>();
            data.put("NotificationType", NotificationType.RTC_OFFER.toString());
            data.put("img", source.getImgUrl());
            data.put("name", source.getName());
            data.put("username", source.getUsername());
            fcmBean.sendNotification(target.getUsername(),"BalanceIt","call ended",data,true);

        }

        if(signalDTO.notificationType==NotificationType.RTC_ANSWER){
            Map<String,String> data=new HashMap<>();
            data.put("NotificationType", NotificationType.RTC_ANSWER.toString());
            data.put("img", source.getImgUrl());
            data.put("name", source.getName());
            data.put("username", source.getUsername());
            fcmBean.sendNotification(target.getUsername(),"BalanceIt","call ended",data,true);

        }


        return new ResponseEntity<String>("call sent", HttpStatus.OK);
    }



    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void upsertActorState(Actor actor,CallStatus callStatus){
        LOGGER.info("upsertActorState");
        Actor dbActor=actorRepository.findByUsername(actor.getUsername());
        dbActor.setCallStatus(callStatus);
    }

    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void upsertSubscriptionState(Subscription subscription,CallStatus callStatus){
        LOGGER.info("upsertSubscriptionState");

        Subscription dbSubscription=subscriptionRepository.findById(subscription.getId()).get();
        dbSubscription.setCallStatus(callStatus);
    }

    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void ringingTimeout(List<Actor> callers,Subscription subscription){
        LOGGER.info("ringingTimeout");

        Thread timeoutRinging=new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    Thread.sleep(30000);
                    signalingService.endRinging(callers,subscription);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });
        timeoutRinging.start();

    }

    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void endRinging(List<Actor> callers,Subscription subscription){
        LOGGER.info("endRinging");

        callers.forEach( caller -> {
            Actor updatedCaller=actorRepository.findByUsername(caller.getUsername());
            if(updatedCaller.getCallStatus()==CallStatus.RINGING){
                updatedCaller.setCallStatus(CallStatus.IDLE);
                Map<String,String> data=new HashMap<>();
                data.put("NotificationType", NotificationType.CALL_END.toString());
                fcmBean.sendNotification(caller.getUsername(),"BalanceIt","call ended",data,true);
            }

        });

        if(subscription.getCallStatus()==CallStatus.RINGING){
            signalingService.upsertSubscriptionState(subscription,CallStatus.IDLE);
        }
    }


    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void endCall(List<Actor> callers,Subscription subscription){
        LOGGER.info("endCall List<Actor> callers,Subscription subscription");

        callers.forEach( caller -> {
            Actor updatedCaller=actorRepository.findByUsername(caller.getUsername());
            if(updatedCaller.getCallStatus()!=CallStatus.IDLE){
                updatedCaller.setCallStatus(CallStatus.IDLE);
                Map<String,String> data=new HashMap<>();
                data.put("NotificationType", NotificationType.CALL_END.toString());
                fcmBean.sendNotification(caller.getUsername(),"BalanceIt","call ended",data,false);
            }

        });

        if(subscription.getCallStatus()!=CallStatus.IDLE){
            signalingService.upsertSubscriptionState(subscription,CallStatus.IDLE);
        }

    }



    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void endCall(OAuth2Authentication user, SignalDTO signalDTO){
        LOGGER.info("endCall OAuth2Authentication user, SignalDTO signalDTO");

        Actor caller= actorRepository.findByUsername(user.getPrincipal().toString());
        Actor target= actorRepository.findByUsername(signalDTO.getTarget().getUsername());
        Subscription subscription=subscriptionRepository.findById(signalDTO.getSubscription().getId()).get();
        List<Actor> list=new ArrayList<>();
        list.add(caller);list.add(target);
        signalingService.endCall(list,subscription);
    }

     public void sendRingingNotification(Actor caller,Actor target,Subscription subscription){
        LOGGER.info("sendRingingNotification");

        Map<String,String> data=new HashMap<>();
        data.put("NotificationType", NotificationType.CALL_RINGING.toString());
        data.put("img", target.getImgUrl());
        data.put("name", target.getName());
        data.put("username", target.getUsername());
        data.put("subscriptionId", subscription.getId().toString());
        fcmBean.sendNotification(caller.getUsername(),"BalanceIt","call ended",data,true);

    }

     public void sendCallOfferNotification(Actor caller,Actor target,Subscription subscription){
         LOGGER.info("sendCallOfferNotification");
         Map<String,String> data=new HashMap<>();
        data.put("NotificationType", NotificationType.CALL_OFFER.toString());
        data.put("img", caller.getImgUrl());
        data.put("name", caller.getName());
        data.put("username", caller.getUsername());
        data.put("subscriptionId", subscription.getId().toString());
        fcmBean.sendNotification(target.getUsername(),"BalanceIt","call offer",data,true);

    }


    public void sendAnswerNotification(Actor offerer,Actor answerer){
        LOGGER.info("sendAnswerNotification");

        Map<String,String> dataForOfferer=new HashMap<>();
        dataForOfferer.put("NotificationType", NotificationType.CALL_ANSWER.toString());
        dataForOfferer.put("img", answerer.getImgUrl());
        dataForOfferer.put("name", answerer.getName());
        dataForOfferer.put("username", answerer.getUsername());
        dataForOfferer.put("caller_type", "offerer");
        fcmBean.sendNotification(offerer.getUsername(),"BalanceIt","call answer",dataForOfferer,true);

        Map<String,String> dataForAnswerer=new HashMap<>();
        dataForAnswerer.put("NotificationType", NotificationType.CALL_ANSWER.toString());
        dataForAnswerer.put("img", offerer.getImgUrl());
        dataForAnswerer.put("name", offerer.getName());
        dataForAnswerer.put("username", offerer.getUsername());
        dataForOfferer.put("caller_type", "answerer");
        fcmBean.sendNotification(answerer.getUsername(),"BalanceIt","call answer",dataForOfferer,true);

    }

    public boolean isSubscriptionHaveEnoughBalance(SubscriptionDTO subscriptionDTO){
        LOGGER.info("isSubscriptionHaveEnoughBalance");

        boolean result=false;
        Subscription dbSubscription= subscriptionRepository.findById(subscriptionDTO.getId()).get();

        if(dbSubscription!=null){
            if(dbSubscription.getCallMinutes()>0){
                result=true;
            }
        }

        return result;
    }

    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void updateSdpAndIce(OAuth2Authentication user, SignalDTO signalDTO){
        LOGGER.info("updateSdpAndIce");

        Actor actor= actorRepository.findByUsername(user.getPrincipal().toString());
        if(signalDTO.getIce() !=null && signalDTO.getSdp()!=null){
            actor.setSdp(signalDTO.getSdp());
            actor.setIce(signalDTO.getIce());
        }
    }


    public ResponseEntity<?> getSdpAndIce(ActorDTO actorDTO){

        Actor actor=actorRepository.findByUsername(actorDTO.getUsername());
        if(actor==null){return  new ResponseEntity<SignalErrorType>(SignalErrorType.CONNECTION_ERROR,HttpStatus.INTERNAL_SERVER_ERROR);}
        SignalDTO signalDTO=new SignalDTO();
        signalDTO.setIce(actor.getIce());
        signalDTO.setSdp(actor.getSdp());
        return new ResponseEntity<SignalDTO>(signalDTO,HttpStatus.OK);
    }

    public ResponseEntity<?> getBalance(SubscriptionDTO subscriptionDTO){
        Subscription subscription=subscriptionRepository.findById(subscriptionDTO.getId()).get();

        if (subscription==null){new ResponseEntity<NoSuchElementException>(new NoSuchElementException("null"),HttpStatus.INTERNAL_SERVER_ERROR); }

        return new ResponseEntity<Double>(subscription.getCallMinutes(), HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<?> chargeBalance(Subscription subscriptionDTO){
        Subscription subscription=subscriptionRepository.findById(subscriptionDTO.getId()).get();

        if (subscription==null){new ResponseEntity<NoSuchElementException>(new NoSuchElementException("null"),HttpStatus.INTERNAL_SERVER_ERROR); }
        double minutes=subscription.getCallMinutes();
        if(minutes>0){
            subscription.setCallMinutes(minutes-1);
        }
        return new ResponseEntity<Double>(subscription.getCallMinutes(), HttpStatus.OK);
    }


    public void sendIce(SignalDTO signalDTO){
        Map<String,String> data=new HashMap<>();
        data.put("NotificationType", NotificationType.ADD_ICE.toString());
        data.put("ice", signalDTO.ice);
        fcmBean.sendNotification(signalDTO.target.getUsername(),"BalanceIt","call ended",data,true);
    }


    //...implement charging

    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void charge(Actor caller,Actor target,Subscription subscription){
        LOGGER.info("charge");

        Thread thread =new Thread(() -> {

            boolean isCallerCalling=true;
            boolean isTargetCalling=true;
            boolean isSubscriptionCalling=true;

            while (isCallerCalling && isTargetCalling && isSubscriptionCalling){
                try {
                    Thread.sleep(60000);
                    Actor dbCaller=actorRepository.findByUsername(caller.getUsername());
                    Actor dbTarget=actorRepository.findByUsername(target.getUsername());
                    Subscription dbSubscription=subscriptionRepository.findById(subscription.getId()).get();

                     isCallerCalling=(dbCaller.getCallStatus()==CallStatus.CALLING)?true:false;
                     isTargetCalling=(dbTarget.getCallStatus()==CallStatus.CALLING)?true:false;
                     isSubscriptionCalling=(dbSubscription.getCallStatus()==CallStatus.CALLING)?true:false;

                     if(        isCallerCalling
                             && isTargetCalling
                             && isSubscriptionCalling
                             && !dbSubscription.isUnlimitedCall()
                             && Thread.currentThread().getId()==dbSubscription.getChargeThreadId()
                     ){

                         double minutes=dbSubscription.getCallMinutes();

                         //...here each miniute will deducte one minute and send push notifications
                         if(minutes>0){

                             signalingService.reduceBalance(dbSubscription);
                             Map<String,String> data=new HashMap<>();
                             data.put("NotificationType", NotificationType.NEW_BALANCE.toString());
                             data.put("NEW_BALANCE", minutes-1+"");
                             fcmBean.sendNotification(dbCaller.getUsername(),"BalanceIt","balance update",data,true);
                             fcmBean.sendNotification(dbTarget.getUsername(),"BalanceIt","balance update",data,true);

                         }else{
                             //...end the call minutes consumed

                             List<Actor> callers=new ArrayList<>();
                             callers.add(dbCaller);
                             callers.add(dbTarget);
                             signalingService.endCall(callers,subscription);
                             isCallerCalling=false;
                             isTargetCalling=false;
                             isSubscriptionCalling=false;
                             LOGGER.info("end charging thread, balance consumed"+Thread.currentThread().getId());

                             break;
                         }

                     }else{
                         LOGGER.info("end charging thread, boolean condition is not true"+Thread.currentThread().getId());
                         LOGGER.info("isCallerCalling :"+isCallerCalling);
                         LOGGER.info("isTargetCalling :"+isTargetCalling);
                         LOGGER.info("isSubscriptionCalling :"+isSubscriptionCalling);
                         LOGGER.info("Thread.currentThread().getId()==dbSubscription.threadId :"+(Thread.currentThread().getId()==dbSubscription.getChargeThreadId()));

                         isCallerCalling=false;
                         isTargetCalling=false;
                         isSubscriptionCalling=false;
                         break;
                     }

                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }

        });
        signalingService.setChargeThreadId(subscription,thread.getId());
        thread.start();

    }

    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void reduceBalance(Subscription subscription){
        Subscription dbSubscription=subscriptionRepository.findById(subscription.getId()).get();
        if(dbSubscription.getCallMinutes()>0){
            dbSubscription.setCallMinutes(dbSubscription.getCallMinutes()-1);
        }
    }


    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void setChargeThreadId(Subscription subscription, Long threadId){
        Subscription dbSubscription=subscriptionRepository.findById(subscription.getId()).get();
        dbSubscription.setChargeThreadId(threadId);
    }

    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void setAnswerThreadId(Subscription subscription, Long threadId){
        Subscription dbSubscription=subscriptionRepository.findById(subscription.getId()).get();
        dbSubscription.setAnswerThreadId(threadId);
    }*/

}
