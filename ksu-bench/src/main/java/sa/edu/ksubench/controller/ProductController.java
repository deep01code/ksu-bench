package sa.edu.ksubench.controller;


/*import com.mustajal.micro.model.sales_domain.rateplan.product.DescriptionItem;
import com.mustajal.micro.model.sales_domain.rateplan.product.Product;
import com.mustajal.micro.repo.DescriptionItemRepository;
import com.mustajal.micro.repo.ProductRepository;*/
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController()
public class ProductController {
    private  final Logger LOGGER = LogManager.getLogger(getClass().getName());


   /* @Autowired
    ProductRepository productRepository;

    @Autowired
    DescriptionItemRepository descriptionItemRepository;

    @GetMapping("/product")
    public List<Product> getProducts(){

        return productRepository.findAll();
    }*/












}
