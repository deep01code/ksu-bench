package com.stc.gamma.authService.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity(name ="account")
public @Data
class Account implements Serializable {


    @Id
    private String username;

    private String password;

    private boolean accountNonExpired,accountNonLocked,credentialsNonExpired,enabled;

    //todo fix the new array list
    @ManyToMany(fetch = FetchType.EAGER)
    @JsonIgnore
    private List<Role> roles=new ArrayList<>();



}
