package sa.edu.ksubench.controller;

/*import com.mustajal.micro.DTO.ControllersDTOs.SignalDTO;
import com.mustajal.micro.DTO.GeneralDTOs.ActorDTO;
import com.mustajal.micro.DTO.GeneralDTOs.SubscriptionDTO;
import com.mustajal.micro.model.actor_domain.user.Actor;
import com.mustajal.micro.model.actor_domain.user.CallStatus;
import com.mustajal.micro.model.network_domain.signal.SignalErrorType;
import com.mustajal.micro.model.sales_domain.subscription.Subscription;
import com.mustajal.micro.repo.ActorRepository;
import com.mustajal.micro.service.SignalingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;*/
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class SignalingController {


   /* @Autowired
    SignalingService signalingService;

    @PostMapping("/call")
    public ResponseEntity<?> call(OAuth2Authentication user, @RequestBody SignalDTO signalDTO){
       return  signalingService.call(user,signalDTO);
    }

    @PostMapping("/answer-call")
    public ResponseEntity<?> answerCall(OAuth2Authentication user,@RequestBody SignalDTO signalDTO){
        return  signalingService.answerCall(user,signalDTO);
    }

    @PostMapping("/end-call")
    public void endCall(OAuth2Authentication user, @RequestBody SignalDTO signalDTO){

        signalingService.endCall(user,signalDTO);
    }

    @GetMapping("/is-subscription-have-enough-balance")
    public boolean isSubscriptionHaveEnoughBalance(SubscriptionDTO subscriptionDTO){
        return signalingService.isSubscriptionHaveEnoughBalance(subscriptionDTO);
    }


    @PostMapping("/update-sdp-and-ice")
    public void updateSdpAndIce(OAuth2Authentication user, @RequestBody SignalDTO signalDTO){
        signalingService.updateSdpAndIce(user,signalDTO);
    }

    @PostMapping("/get-sdp-and-ice")
    public ResponseEntity<?> getSdpAndIce(@RequestBody ActorDTO actorDTO){
        return signalingService.getSdpAndIce(actorDTO);
    }

    @PostMapping("/get-balance")
    public ResponseEntity<?> getBalance(@RequestBody SubscriptionDTO subscriptionDTO){
        return signalingService.getBalance(subscriptionDTO);
    }

    *//*@PostMapping("/charge")
    public ResponseEntity<?> chargeBalance(@RequestBody SubscriptionDTO subscriptionDTO){
        return signalingService.chargeBalance(subscriptionDTO);
    }*//*

    @PostMapping("/sendIce")
    public void sendIce(@RequestBody SignalDTO signalDTO){
        signalingService.sendIce(signalDTO);
    }

    @PostMapping("/rtc-offer-or-answer-signal")
    public  ResponseEntity<?> rtcOfferOrAnswerSignal(OAuth2Authentication user,@RequestBody SignalDTO signalDTO){
        return signalingService.rtcOfferOrAnswerSignal(user,signalDTO);
    }*/

}
