package sa.edu.ksubench.model.lookup;


import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@EntityListeners(TermsListener.class)
public class Terms {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;


    @Column(columnDefinition="TEXT")
    private String contentArabic,contentEnglish;

    @Temporal(TemporalType.TIMESTAMP)
    private Date creationDate;



}
