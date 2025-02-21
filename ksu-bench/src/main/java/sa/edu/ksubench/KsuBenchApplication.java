package sa.edu.ksubench;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import sa.edu.ksubench.model.actor_domain.account.Role;
import sa.edu.ksubench.model.actor_domain.account.UserAccount;
import sa.edu.ksubench.model.actor_domain.user.Actor;
import sa.edu.ksubench.model.actor_domain.user.ActorType;
import sa.edu.ksubench.model.actor_domain.user.RegistrationType;
import sa.edu.ksubench.repo.ActorRepository;
import sa.edu.ksubench.repo.UserRepository;
import sa.edu.ksubench.utilities.BeanUtil;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Random;

@SpringBootApplication
@EnableResourceServer
public class KsuBenchApplication {

    public static void main(String[] args) {
        SpringApplication.run(KsuBenchApplication.class, args);

        createAdmin();
    }

    public static void createAdmin(){

        try{

            UserRepository userRepository= BeanUtil.getBean(UserRepository.class);
            ActorRepository actorRepository= BeanUtil.getBean(ActorRepository.class);


            Actor actor =new Actor();
            actor.setUsername("admin");
            actor.setName("Yasser");
            if(userRepository.existsById(actor.getUsername())){
                throw new Exception("duplicated account");
            }

            UserAccount userAccount = new UserAccount();
            userAccount.setUsername(actor.getUsername());
            String tempPass=String.format("%04d", new Random().nextInt(10000));
            //userAccount.setPassword(new BCryptPasswordEncoder().encode(tempPass)); //2
            userAccount.setPassword(new BCryptPasswordEncoder().encode("admin")); //2
            userAccount.setAccountNonExpired(true);
            userAccount.setAccountNonLocked(true);
            userAccount.setCredentialsNonExpired(true);
            userAccount.setEnabled(true);
            Role role=new Role();
            role.setRoleName("ROLE_ADMIN");
            ArrayList<Role> roles=new ArrayList<>();
            roles.add(role);
            userAccount.setRoles(roles);
            actor.setRegistrationType(RegistrationType.ACCEPTED);
            actor.setActorType(ActorType.ADMIN);

            userRepository.save(userAccount); // create auth account
            actorRepository.save(actor);

        }catch (Exception e){
            if(e.getMessage().equals(new String("duplicated account"))){
                //System.err.println(e.getMessage());
            }
            else {
                e.printStackTrace();
            }
        }
    }
}


@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
class SimpleCorsFilter implements Filter {

    public SimpleCorsFilter() {
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
        HttpServletResponse response = (HttpServletResponse) res;
        HttpServletRequest request = (HttpServletRequest) req;
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Headers", "x-requested-with, authorization,Content-Type,Accept");

        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
        } else {
            chain.doFilter(req, res);
        }
    }

    @Override
    public void init(FilterConfig filterConfig) {
    }

    @Override
    public void destroy() {
    }



}