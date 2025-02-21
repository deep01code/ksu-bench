package sa.edu.ksubench.model.actor_domain.account;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
public class  Role{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;

    private String roleName;

    @ManyToMany
    @JsonIgnore
    List<UserAccount> userAccounts;


}
