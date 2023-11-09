package com.cs395latest.Controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;

import com.cs395latest.Model.User;
import com.cs395latest.Service.AdminService;
import com.cs395latest.Service.EmployeeService;
import com.cs395latest.Service.UserService;
import com.cs395latest.config.AuthCredentialsRequest;
import com.cs395latest.config.JwtUtil;
import com.cs395latest.config.LoginResponse;
import com.cs395latest.config.UserRequest;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private EmployeeService employeeService;
    
    @Autowired
    private AdminService adminService;
    

    @PostMapping("/login")
    public LoginResponse login(@RequestBody AuthCredentialsRequest request) {
    	
    	LoginResponse res = new LoginResponse();
    	
		if(userService.getuserByUsername(request.getUsername()) == null) {
			
			res.setMessage("You are not an employee of the company");
			return res;

		}
		try {
	        Authentication authentication = authenticationManager.authenticate(
	                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
	            SecurityContextHolder.getContext().setAuthentication(authentication);
	            String jwt = jwtUtil.generateJwtToken(authentication);
	            
	            User res1 = jwtUtil.getUserFromJwt(jwt);
	            
	            res.setMessage("Successfully logged in");
	            res.setAccessToken("Bearer " + jwt);
	            if(adminService.getAdminByUsername(res1.getUsername()) != null) {
	            	
	            	res.setUser_role("admin");
	            	res.setUserId(adminService.getAdminByUsername(res1.getUsername()).getId());
	            }
	            
	            else {
	            	
	            	res.setUser_role("employee");
	            	res.setUserId(employeeService.getEmployeebyUsername(res1.getUsername()).getId());
	            }
	            
	            return res;
		}
		
		catch (Exception ex){
			
			res.setMessage("Wrong Password or Username");
			return res;
		}
		
		
		
    }
    
    
    @PutMapping("/register")
	public ResponseEntity<?> register(@RequestBody UserRequest registerRequest) {
		if(userService.getuserByUsername(registerRequest.getUsername()) != null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		
		else {
			
			adminService.getregister(registerRequest);
			
			return new ResponseEntity<>(HttpStatus.OK);
	    }
		
    }
    
    
    
    @GetMapping("/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response, Authentication auth) {
    	
    	
    	if(auth != null) {		
    		
    		new SecurityContextLogoutHandler()
    		.logout(request, response, auth);
    		
    		
    	}
    	
    	return "/";
    }
    
}