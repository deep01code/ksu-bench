package sa.edu.ksubench.utilities;

/*import com.mustajal.micro.model.lookup.LookupValueType;
import com.mustajal.micro.repo.LookupValueRepository;*/
import org.springframework.core.env.Environment;

public class LookupValueUtility {

  /*  static LookupValueRepository lookupValueRepository= BeanUtil.getBean(LookupValueRepository.class);

    public static String getPaymentKey(){
        String key="";
        Environment env= BeanUtil.getBean(Environment.class);

        if(env.getProperty("spring.profiles.active").equals("prod")) {
            key=lookupValueRepository.findFirstByLookupValueType(LookupValueType.PAYMENT_PROD_KEY).getValue();
        }else{
            key=lookupValueRepository.findFirstByLookupValueType(LookupValueType.PAYMENT_DEV_KEY).getValue();
        }
        return key;
    }

    public static String getVatPercentage(){ return lookupValueRepository.findFirstByLookupValueType(LookupValueType.VAT_PERCENTAGE).getValue();}
    public static String getNutritionistPercentage(){ return lookupValueRepository.findFirstByLookupValueType(LookupValueType.NUTRITIONIST_PERCENTAGE).getValue();}
    public static String getAppPercentage(){ return lookupValueRepository.findFirstByLookupValueType(LookupValueType.APP_PERCENTAGE).getValue();}
    public static String getSupportEmail(){ return lookupValueRepository.findFirstByLookupValueType(LookupValueType.SUPPORT_EMAIL).getValue();}*/

}
