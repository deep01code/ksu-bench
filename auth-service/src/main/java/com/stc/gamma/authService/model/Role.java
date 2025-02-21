package com.stc.gamma.authService.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity(name ="role")
@Data
public class  Role implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String roleName,description;

    @ManyToMany
    List<Account> userAccounts=new ArrayList<>();


}
