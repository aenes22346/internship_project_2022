package com.cs395latest.config;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.cs395latest.Model.Admin;
import com.cs395latest.Model.Employee;
import com.cs395latest.Model.User;
import com.cs395latest.Service.AdminService;
import com.cs395latest.Service.EmployeeService;
import com.cs395latest.Service.UserService;

@Component
public class JwtUtil {
	
	Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
	
    @Autowired
    private UserService userService;
    
    @Autowired
    private EmployeeService employeeService;
    
    
    @Autowired
    private AdminService adminService;
    
	
	public String generateJwtToken(Authentication auth) {
		
		UserDetailsImpl userDetails = (UserDetailsImpl) auth.getPrincipal();
        return JWT.create().withSubject(userDetails.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + 10 * 24 * 360 * 100))
                .sign(algorithm);
	}
	
	public String getUserIdFromJwt(String Jwt) {	
		
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decodedJWT = verifier.verify(Jwt);
        String username = decodedJWT.getSubject();
        User user = userService.getuserByUsername(username);

    	return user.getId();

	}
	
	public User getUserFromJwt(String Jwt) {	
		
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decodedJWT = verifier.verify(Jwt);
        String username = decodedJWT.getSubject();
        User user = userService.getuserByUsername(username);
        
        return user;
        
      

	}
	
	public Employee getEmployeefromJwt(String Jwt) {
		
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decodedJWT = verifier.verify(Jwt);
        String username = decodedJWT.getSubject();
        Employee emp = employeeService.getEmployeebyUsername(username);
        
        return emp;
		
		
	}
	
	public Admin getAdminfromJwt(String Jwt) {
		
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decodedJWT = verifier.verify(Jwt);
        String username = decodedJWT.getSubject();
        Admin emp = adminService.getAdminByUsername(username);
        
        return emp;
		
		
	}

}