package sa.edu.ksubench.service;

/*import com.mustajal.micro.model.sales_domain.subscription.Subscription;
import com.mustajal.micro.model.sales_domain.subscription.SubscriptionStatus;
import com.mustajal.micro.repo.SubscriptionRepository;*/
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class TimeoutServices {

/*    @Autowired
    SubscriptionRepository subscriptionRepository;


    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void expireSubscription(Subscription subscriptionRequest){
        Subscription subscription =subscriptionRepository.findById(subscriptionRequest.getId()).get();
        subscription.setSubscriptionStatus(SubscriptionStatus.expire);
    }

    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void rejectSubscription(Subscription subscriptionRequest){
        Subscription subscription =subscriptionRepository.findById(subscriptionRequest.getId()).get();
        subscription.setSubscriptionStatus(SubscriptionStatus.rejected);
    }*/

}
