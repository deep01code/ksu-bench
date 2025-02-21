package sa.edu.ksubench.config;


import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;


@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true, jsr250Enabled = true)
public class ResourceServerConfiguration extends ResourceServerConfigurerAdapter {

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/public").permitAll()
                .antMatchers("/get-accepted-nutritionists").permitAll()
                .antMatchers("/nutritionist-plans").permitAll()
                .antMatchers("/api-docs/**").permitAll()
                .antMatchers("/swagger-ui/**").permitAll()
                .antMatchers("/swagger-ui-custom.html").permitAll()
                .antMatchers("/get-product").permitAll()
                .antMatchers("/search-nutritionist").permitAll()
                .antMatchers("/get-random-accepted-nutritionists").permitAll()
                .antMatchers("/public").permitAll()
                .antMatchers("/get-articles").permitAll()
                .antMatchers("/get-terms").permitAll()
                .antMatchers("/register-customer").permitAll()
                .antMatchers("/register-nutritionist").permitAll()
                .antMatchers("/downloadFile/**").permitAll()
                .antMatchers("/favicon.ico").permitAll()
                .antMatchers("/get-otp").permitAll()
                .anyRequest().authenticated();
        http.cors().disable();
        http.csrf().disable();
    }
}
