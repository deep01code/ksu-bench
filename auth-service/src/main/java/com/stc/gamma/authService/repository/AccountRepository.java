package com.stc.gamma.authService.repository;

import com.stc.gamma.authService.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {

    Optional<Account> findByUsername(final String username);
}
