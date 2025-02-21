package com.stc.gamma.authService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.ConsumerTokenServices;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

/*
 * Count of employee on Site/of shore per month 
 */


@SpringBootApplication
/*
@EnableResourceServer
@EnableAuthorizationServer
*/
@RestController
@EnableResourceServer
public class AuthApplication {



	@RequestMapping(method=RequestMethod.GET ,value = { "/user" }, produces = "application/json")
	public Map<String,Object> user(OAuth2Authentication user,Principal principal){

		Map<String ,Object> userInfo= new HashMap<>();
		userInfo.put("user",user.getUserAuthentication().getPrincipal());
		userInfo.put("authorities",AuthorityUtils.authorityListToSet(user.getUserAuthentication().getAuthorities()));
		userInfo.put("getDetails", user.getDetails());
		userInfo.put("getDetails",user.getUserAuthentication().getDetails());

		userInfo.put("Principal",principal.getName());
		return userInfo;
	}





	@GetMapping("/exit")
	public void revokeToken(HttpServletRequest request) {
		String authorization = request.getHeader("Authorization");
/*
		if (authorization != null && authorization.contains("Bearer")){
			String tokenId = authorization.substring("Bearer".length()+1);
			tokenServices.revokeToken(tokenId);
		}
*/
	}

	@GetMapping("/private")
	public String pass(){
		return "this is a protected";
	}


	public static void main(String[] args) {
		SpringApplication.run(AuthApplication.class, args);
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

/*

@Configuration
class ResourceServerConfiguration extends ResourceServerConfigurerAdapter {


	@Override
	public void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests().antMatchers(HttpMethod.GET,"/v2/api-docs", "/configuration/ui", "/swagger-resources", "/configuration/security", "/swagger-ui.html", "/webjars/**").anonymous();
	}
}
*/
