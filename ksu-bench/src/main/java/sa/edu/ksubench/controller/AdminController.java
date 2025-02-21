package sa.edu.ksubench.controller;
/*
import com.mustajal.micro.DTO.ControllersDTOs.UpsertProductDTO;
import com.mustajal.micro.DTO.GeneralDTOs.ProductDTO;
import com.mustajal.micro.beans.FcmBean;
import com.mustajal.micro.exception.UserNotFoundException;
import com.mustajal.micro.model.actor_domain.user.Actor;
import com.mustajal.micro.model.lookup.LookupValue;
import com.mustajal.micro.model.lookup.LookupValueType;
import com.mustajal.micro.model.sales_domain.rateplan.product.Product;
import com.mustajal.micro.repo.*;
import com.mustajal.micro.service.AdminService;*/
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.security.RolesAllowed;
import java.util.*;

@RestController
@RolesAllowed({"ROLE_ADMIN"})
public class AdminController {
    private  final Logger LOGGER = LogManager.getLogger(getClass().getName());

    /*@Autowired
    ActorRepository actorRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    RatePlanRepository ratePlanRepository;

    *//*@Autowired
    PriceRepository priceRepository;
*//*
    @Autowired
    DescriptionItemRepository descriptionItemRepository;

    @Autowired
    FcmBean fcmBean;

    @Autowired
    AdminService adminService;



    //...done
    @PostMapping("/accept-nutritionist")
    public ResponseEntity<String> acceptNutritionist(@RequestBody Actor actor) throws Exception {
        String result=  result = adminService.acceptNutritionist(actor);
        return new ResponseEntity<String>(result,HttpStatus.OK);
    }


    @PostMapping("/reject-nutritionist")
    public ResponseEntity<String> rejectNutritionist(@RequestBody Actor actor) throws Exception {
        String result=  result = adminService.rejectNutritionist(actor);
        return   ResponseEntity.status(HttpStatus.OK).build();

    }


    @GetMapping("/get-nutritionists")
    public List<Actor> getNutritionists(Pageable pageable){
        return adminService.getNutritionists(pageable);
    }


    @GetMapping("/get-pending-nutritionists")
    public List<Actor> getPendingNutritionists(Pageable pageable){
        return adminService.getPendingNutritionists(pageable);
    }


    @PostMapping("/register-admin")
    public ResponseEntity<String> registerAdmin(@RequestBody Actor actor) throws UserNotFoundException {
        adminService.registerAdmin(actor);
        return   ResponseEntity.status(HttpStatus.OK).build();
    }


    //NOTE implementation after 1-8-2021
    @PostMapping("/upsert-product")
    public ResponseEntity<?> upsertProduct(@RequestBody ProductDTO productDTO){
        return new ResponseEntity<Product>(adminService.upsertProduct(productDTO),HttpStatus.OK);
    }

    @GetMapping("/lookup-types")
    public ResponseEntity<?> getLookupTypes(){
        return new ResponseEntity<LookupValueType[]>(LookupValueType.values(),HttpStatus.OK);
    }

    @GetMapping("/products")
    public ResponseEntity<?> getAllProducts(Pageable pageable){
        List<Product> products= adminService.getAllProducts(pageable);
        return new ResponseEntity<List<Product>>(products,HttpStatus.OK);
    }
*/
    //...dublicated
/*    @GetMapping("/lookup-values")
    public ResponseEntity<?> getLookupValues(){
        return adminService.getLookupValues();
    }

    @PostMapping("/upsert-lookup")
    public ResponseEntity<?> upsertLookup(@RequestBody LookupValue lookupValue){

        return adminService.upsertLookup(lookupValue);
    }*/




}
