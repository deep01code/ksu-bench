package sa.edu.ksubench.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.boot.actuate.trace.http.HttpTrace;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.security.RolesAllowed;
import java.util.HashMap;
import java.util.Map;

@RestController
public class WelcomeController {
    private  final Logger LOGGER = LogManager.getLogger(getClass().getName());

    @GetMapping("/public")
    public String welcomePublic() {
        return "welcome public/guest user";
    }

    @RolesAllowed({"ROLE_ADMIN"})
    @GetMapping("/admin")
    public String welcomeAdmin() {
        return "welcome admin";
    }

    @RolesAllowed({"ROLE_USER"})
    @GetMapping("/userx")
    public String welcomeUser() {
        return "welcome user";
    }



}
