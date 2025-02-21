package com.stc.gamma.authService.config;


import com.stc.gamma.authService.model.Account;
import com.stc.gamma.authService.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    AccountRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account userAccount = userRepository.findByUsername(username).get();
        if(userAccount == null){
            throw new UsernameNotFoundException(username);
        }else{
            UserDetails details = new CustomUserDetails(userAccount);
            return details;
        }    }
}
