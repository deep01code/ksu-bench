package sa.edu.ksubench.service.triggers;

/*import com.mustajal.micro.beans.FcmBean;
import com.mustajal.micro.model.network_domain.notification.NotificationType;
import com.mustajal.micro.model.sales_domain.subscription.Subscription;
import com.mustajal.micro.model.sales_domain.subscription.SubscriptionStatus;
import com.mustajal.micro.repo.SubscriptionRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;*/

/*@Service
@Order(Ordered.LOWEST_PRECEDENCE)*/
public class TimeoutTriggerService {
   /* private  final Logger LOGGER = LogManager.getLogger(getClass().getName());

    @Autowired
    SubscriptionRepository subscriptionRepository;

    @Autowired
    TimeoutTriggerService timeoutTriggerService;

    @Autowired
    FcmBean fcmBean;

    TimeoutTriggerService(){
        Thread thread=new Thread(()->{
            try {
                Thread.sleep(10000);
                timeoutTriggerService.triggerSubscriptionsExpire();
                timeoutTriggerService.triggerSubscriptionsRequestTimeout();
                timeoutTriggerService.triggerSubscriptionsPaymentTimeout();

            } catch (InterruptedException e) {
                e.printStackTrace();
            }

        });
        thread.start();
    }



    //note: will be triggered when subscription expire
    @Transactional
    public void triggerSubscriptionsExpire(){
        	 final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
		scheduler.scheduleAtFixedRate(new Runnable() {
			@Override
			public void run() {
						try{

                            LOGGER.info("triggerSubscriptionsExpire");
							List<Subscription> activeSubscriptions=subscriptionRepository.findAllBySubscriptionStatus(SubscriptionStatus.active);
							activeSubscriptions.forEach(subscription -> {

								Calendar validUntilDateCalendar = Calendar.getInstance();
								Calendar currentCalendar = Calendar.getInstance();

                                if(subscription.getValidUntilDate()!=null){
                                    validUntilDateCalendar.setTime(subscription.getValidUntilDate());
                                    currentCalendar.setTime(new Date());

                                    if(currentCalendar.after(validUntilDateCalendar)){
                                        subscription.setSubscriptionStatus(SubscriptionStatus.expire);
                                        subscriptionRepository.save(subscription);
                                        //...notify users for subscription expiry
                                        Map<String,String> data=new HashMap<>();
                                        data.put("NotificationType", NotificationType.EXPIRE_SUBSCRIPTION.toString());
                                        //   data.put("eventCreator", dbSubscription.getActor().getName());
                                        fcmBean.sendNotification(subscription.getNutritionist().getUsername(),"BalanceIt","subscription with "+subscription.getCustomer().getName()+" expired",data,false);
                                        fcmBean.sendNotification(subscription.getCustomer().getUsername(),"BalanceIt","subscription with "+subscription.getNutritionist().getName()+" expired",data,false);
                                    }
                                }



                            });

						}catch (Exception e){
                            LOGGER.error(e.toString());
//                            e.printStackTrace();
						}
			}
		}, 0, 15, TimeUnit.MINUTES);
    }

    //note: will be triggered if nutritionist didn't accept/reject the subscirption
    @Transactional
    public void triggerSubscriptionsRequestTimeout(){
        final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
        scheduler.scheduleAtFixedRate(new Runnable() {
            @Override
            public void run() {
                try{

                    LOGGER.info("triggerSubscriptionsRequestTimeout");
                    List<Subscription> pendingSubscriptions=subscriptionRepository.findAllBySubscriptionStatus(SubscriptionStatus.pending);
                    pendingSubscriptions.forEach(subscription -> {

                        Calendar pendingTimeoutDateCalendar = Calendar.getInstance();
                        Calendar currentCalendar = Calendar.getInstance();

                        if(subscription.getPaymentTimeoutDate()!=null){
                            pendingTimeoutDateCalendar.setTime(subscription.getPaymentTimeoutDate());
                            currentCalendar.setTime(new Date());
                            if(currentCalendar.after(pendingTimeoutDateCalendar)){
                                subscription.setSubscriptionStatus(SubscriptionStatus.rejected);
                                subscriptionRepository.save(subscription);

                                Map<String,String> data=new HashMap<>();
                                data.put("NotificationType", NotificationType.REJECT_SUBSCRIPTION_REQUEST.toString());
                                //   data.put("eventCreator", dbSubscription.getActor().getName());
                                fcmBean.sendNotification(subscription.getNutritionist().getUsername(),"BalanceIt","subscription with "+subscription.getCustomer().getName()+" rejected by system",data,false);
                                fcmBean.sendNotification(subscription.getCustomer().getUsername(),"BalanceIt","subscription with "+subscription.getNutritionist().getName()+" rejected by system",data,false);
                            }

                        }



                    });

                }catch (Exception e){
                    LOGGER.error(e.toString());
//                            e.printStackTrace();
                }
            }
        }, 0, 15, TimeUnit.MINUTES);
    }

    //note: will be triggered if customer didn't pay
    @Transactional
    public void triggerSubscriptionsPaymentTimeout(){
        final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
        scheduler.scheduleAtFixedRate(new Runnable() {
            @Override
            public void run() {
                try{

                    LOGGER.info("triggerSubscriptionsPaymentTimeout");
                    List<Subscription> acceptedSubscriptions=subscriptionRepository.findAllBySubscriptionStatus(SubscriptionStatus.accepted);
                    acceptedSubscriptions.forEach(subscription -> {

                        Calendar acceptedTimeoutDateCalendar = Calendar.getInstance();
                        Calendar currentCalendar = Calendar.getInstance();

                        if(subscription.getPaymentTimeoutDate()!=null){
                            acceptedTimeoutDateCalendar.setTime(subscription.getPaymentTimeoutDate());
                            currentCalendar.setTime(new Date());

                            if(currentCalendar.after(acceptedTimeoutDateCalendar)){
                                subscription.setSubscriptionStatus(SubscriptionStatus.rejected);
                                subscriptionRepository.save(subscription);


                                Map<String,String> data=new HashMap<>();
                                data.put("NotificationType", NotificationType.REJECT_SUBSCRIPTION_REQUEST.toString());
                                //   data.put("eventCreator", dbSubscription.getActor().getName());
                                fcmBean.sendNotification(subscription.getNutritionist().getUsername(),"BalanceIt","subscription with "+subscription.getCustomer().getName()+" rejected by system",data,false);
                                fcmBean.sendNotification(subscription.getCustomer().getUsername(),"BalanceIt","subscription with "+subscription.getNutritionist().getName()+" rejected by system",data,false);

                            }
                        }

                    });

                }catch (Exception e){
                    LOGGER.error(e.toString());
//                            e.printStackTrace();
                }
            }
        }, 0, 15, TimeUnit.MINUTES);
    }*/


}

