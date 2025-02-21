package sa.edu.ksubench.model.actor_domain.account;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity(name ="Account")
public @Data
class UserAccount {

    //todo validation phone numbenr.
    @Id
    private String username;

    private String password;

    private String fcmtoken;

    private boolean accountNonExpired,accountNonLocked,credentialsNonExpired,enabled;


    @ManyToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    private List<Role> roles;



}
