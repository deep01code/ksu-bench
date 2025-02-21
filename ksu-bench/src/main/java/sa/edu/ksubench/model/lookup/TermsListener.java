package sa.edu.ksubench.model.lookup;

import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import java.util.Date;

public class TermsListener {

    @PrePersist
    @PreUpdate
    public void methodExecuteBeforeSave(final Terms reference) {
        //Make any change to the entity such as calculation before the save process
        reference.setCreationDate(new Date());
    }
}
