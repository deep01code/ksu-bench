
package sa.edu.ksubench.model.actor_domain.user;

/*import com.mustajal.micro.utilities.BeanUtil;*/
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;

import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import java.util.Date;

public class ActorListener {



/*    @PrePersist
    public void methodExecuteBeforeSave(final Actor reference) {
        //Make any change to the entity such as calculation before the save process
        Environment env= BeanUtil.getBean(Environment.class);
        String ipAddress=env.getProperty("ipAddress");
        String port=env.getProperty("server.port");
        if(reference.getImgUrl()==null){
            reference.setImgUrl("http://"+ipAddress+":"+port+"/downloadFile/avatar.png");
        }
        reference.setRegistrationDate(new Date());

        if(reference.getName()==null || reference.getName()==""){ reference.setName("---");}
        if(reference.getNationalId()==null || reference.getNationalId()==""){ reference.setNationalId("---");}
        if(reference.getEmail()==null || reference.getEmail()==""){ reference.setEmail("---");}
        if(reference.getSpeciality()==null || reference.getSpeciality()==""){ reference.setSpeciality("---");}
        if(reference.getMedicalHistory()==null || reference.getMedicalHistory()==""){ reference.setMedicalHistory("---");}
        if(reference.getWorkingHours()==null || reference.getWorkingHours()==""){ reference.setWorkingHours("---");}
        if(reference.getScfhs()==null || reference.getScfhs()==""){ reference.setScfhs("---");}
        if(reference.getAr_bio()==null || reference.getAr_bio()==""){ reference.setAr_bio("---");}
        if(reference.getEn_bio()==null || reference.getEn_bio()==""){ reference.setEn_bio("---");}
        if(reference.getCallStatus()==null ){ reference.setCallStatus(CallStatus.IDLE);}

    }

    @PreUpdate
    public void methodExecuteBeforeUpdate(final Actor reference){
        if(reference.getName()==null || reference.getName()==""){ reference.setName("---");}
        if(reference.getNationalId()==null || reference.getNationalId()==""){ reference.setNationalId("---");}
        if(reference.getEmail()==null || reference.getEmail()==""){ reference.setEmail("---");}
        if(reference.getSpeciality()==null || reference.getSpeciality()==""){ reference.setSpeciality("---");}
        if(reference.getMedicalHistory()==null || reference.getMedicalHistory()==""){ reference.setMedicalHistory("---");}
        if(reference.getWorkingHours()==null || reference.getWorkingHours()==""){ reference.setWorkingHours("---");}
        if(reference.getScfhs()==null || reference.getScfhs()==""){ reference.setScfhs("---");}
        if(reference.getAr_bio()==null || reference.getAr_bio()==""){ reference.setAr_bio("---");}
        if(reference.getEn_bio()==null || reference.getEn_bio()==""){ reference.setEn_bio("---");}
        if(reference.getCallStatus()==null ){ reference.setCallStatus(CallStatus.IDLE);}
    }*/

}
