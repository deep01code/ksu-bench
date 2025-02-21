package com.stc.gamma.authService.config;

import com.stc.gamma.authService.model.Account;
import com.stc.gamma.authService.model.Role;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class CustomUserDetails implements UserDetails {

    Account userAccount;

    public CustomUserDetails() {
    }

    public CustomUserDetails(Account userAccount) {
        this.userAccount = userAccount;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
         Set<GrantedAuthority> _grntdAuths = new HashSet<GrantedAuthority>();

        if (userAccount !=null) {

            List<Role> _roles = userAccount.getRoles();
            for (Role _role : _roles) {
                _grntdAuths.add(new SimpleGrantedAuthority(_role.getRoleName()));
            }
        }

        return _grntdAuths;
    }


    @Override
    public String getPassword() {
        return userAccount.getPassword();
    }

    @Override
    public String getUsername() {
        return userAccount.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return userAccount.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return userAccount.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return userAccount.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return userAccount.isEnabled();
    }
}
