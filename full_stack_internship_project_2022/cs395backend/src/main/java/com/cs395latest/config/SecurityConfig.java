package com.cs395latest.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;


@Configuration
@EnableWebSecurity
public class SecurityConfig{
	
	
	private JwtAuthenticationEntryPoint handler;
	
	
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    

    @Bean
    public AuthTokenFilter jwtAuthenticationFilter() {
    	return new AuthTokenFilter();
    }
    
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
    
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.setAllowedOrigins(List.of("http://localhost:3000", "http://localhost", "http://localhost:8081", "http://localhost:3000/"));
        config.addAllowedOrigin("http://localhost");
        config.addAllowedHeader("Authorization");
        config.setAllowedHeaders(List.of("Authorization", "Access-Control-Allow-Headers", "authorization", "Access-Control-Allow-Origin", "*"));
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PUT","OPTIONS","PATCH", "DELETE"));
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
    
    @Bean
    public SecurityFilterChain configure(HttpSecurity httpSecurity) throws Exception {
    	httpSecurity
    		.cors()
    		.and()
    		.csrf().disable()
    		.exceptionHandling().authenticationEntryPoint(handler).and()
    		.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
    		.authorizeRequests()
    		.antMatchers("/api/**")
    		.permitAll()
    		.antMatchers("/admins/**")
    		.permitAll()
    		.anyRequest().authenticated()
    		.and()
    		.logout()
    		.logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
    		.clearAuthentication(true)
    		.invalidateHttpSession(true)
    		.deleteCookies("JSESSIONID")
    		.permitAll();
    		
    		
    	httpSecurity.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
    	
    	
    	return httpSecurity.build();
    }
}

