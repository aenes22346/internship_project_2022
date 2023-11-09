package com.cs395latest.Controller;


import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import com.cs395latest.Model.Admin;
import com.cs395latest.Model.Employee;
import com.cs395latest.Model.User;
import com.cs395latest.Requests.AdminRequest;
import com.cs395latest.Requests.ApproveRequest;
import com.cs395latest.Requests.ExcuseRequest;
import com.cs395latest.Requests.HoursRequest;
import com.cs395latest.Requests.PermissionRequest;
import com.cs395latest.Service.AdminService;
import com.cs395latest.Service.EmployeeService;
import com.cs395latest.Service.UserService;
import com.cs395latest.config.UserRequest;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;


@CrossOrigin
@RestController
@RequestMapping("/admins")
@AllArgsConstructor
public class AdminController {

	
	@Autowired
    private AdminService adminService;
	
	
	@Autowired
    private EmployeeService employeeService;
	
	@Autowired 
	private UserService userService;
	


    @PostMapping
    public Admin createadmin(@RequestBody Admin admin) {
        return adminService.addadmin(admin);
    }

    @GetMapping
    public List<Admin> getadmin() {
        return adminService.getadmins();
    }
    
    @GetMapping(path = "/get/{id}")
    public Optional<Admin> getoneadmin(@PathVariable("id") String id) {
        return adminService.getAdmin(id);
    }
    
    
    @PostMapping(path = "/post/{id}")
    public void putadmin(@PathVariable("id") String id, @RequestBody AdminRequest request) {
    	
    	System.out.println(request.getUserid());
    	
    	adminService.putadmin(id);
    	
    	Optional<Employee> emp = employeeService.getEmployee(request.getUserid());
    	
    	if(emp.isPresent()) {
    		
    		Employee emp2 = emp.get();
    		
    		Admin newAdmin = new Admin();
    		
    		newAdmin.setName(emp2.getName());
    		newAdmin.setUsername(emp2.getUsername());
    		newAdmin.setSurname(emp2.getSurname());
    		newAdmin.setPassword(emp2.getPassword());
    		
    		adminService.addadmin(newAdmin);
    		
    		employeeService.deletePersonUsingId(request.getUserid());
    		
    	}
    	

    }
    
    
    @PutMapping(path = "/send/{id}")
    public void postpermission(@PathVariable("id") String id, @RequestBody PermissionRequest request) {
    	
    	
    	Optional<Employee> emp = employeeService.getEmployee(id);
    	
    	if(emp.isPresent()) {
    		
    		Employee emp2 = emp.get();
    		
    		adminService.handlepermission(emp2.getName(), emp2.getSurname(), emp2.getUsername(), request.getResult(), request.getPermission()); 		
    	}
    	
    }
    
    
    @PutMapping(path = "/send/excuse/{id}")
    public void postexcuse(@PathVariable("id") String id, @RequestBody ExcuseRequest request) {
    	
    	
    	Optional<Employee> emp = employeeService.getEmployee(id);
    	
    	if(emp.isPresent()) {
    		
    		Employee emp2 = emp.get();
    		
    		adminService.handleexcuse(emp2.getName(), emp2.getSurname(), emp2.getUsername(), request.getDate(), request.getExcuse()); 		
    	}
    	
    }
    
    @PutMapping(path = "/sendhours/{id}")
    public void posthour(@PathVariable("id") String id, @RequestBody HoursRequest request) {
    	
    	Optional<Admin> adm = adminService.getAdmin(id);
    	
    	Optional<Employee> emp = employeeService.getEmployee(request.getEmpid());
    	
    	if(adm.isPresent()) {
    		
    		Admin adm2 = adm.get();
    		
    		if(emp.isPresent()) {
    			
    			Employee emp2 = emp.get();
    			
    			adminService.increasecustnum(adm2, emp2, request.getEntry(), request.getExit());
    			
    			
    		}
  
    	}
    	
    	
    }
    
    
    @PostMapping(path = "/approveemployee/{id}")
    public void handleemployee(@PathVariable("id") String id, @RequestBody UserRequest registerRequest) {
    	
    	
    	Optional<Admin> admin =  adminService.getAdmin(id);
    	
    	if(admin.isPresent()) {
    		
    		Admin admin2 = admin.get();
    		
    		User user = new User();
    		user.setUsername(registerRequest.getUsername());
    		String createdpass = registerRequest.getPassword();
    		user.setPassword(createdpass);
    		userService.adduser(user);
    		Employee emp = new Employee();
    		emp.setName(registerRequest.getName());
    		emp.setPassword(createdpass);
    		emp.setUsername(registerRequest.getUsername());
    		emp.setSurname(registerRequest.getSurname());
    		
    		employeeService.addemployee(emp);
    		
    		adminService.newregister(admin2, registerRequest.getUsername());
    		
    		
    		
    	}
    
    		
    }
    
    @PutMapping(path = "/disapproveemployee/{id}") 
    public void handleemployee2(@PathVariable("id") String id, @RequestBody UserRequest registerRequest) {
    	
    	Optional<Admin> admin =  adminService.getAdmin(id);
    	
    	if(admin.isPresent()) {
    		
    		Admin admin2 = admin.get();
    		
    		adminService.newregister(admin2, registerRequest.getUsername());
    		
    		
    		
    	}
    	
    }
    
    
    @PutMapping(path = "/handleapprove/{id}") 
    public void putapprove(@PathVariable("id") String id, @RequestBody ApproveRequest request) {
    	
    	Employee emp = employeeService.getEmployeebyUsername(request.getUsername());
    	
    		
    	Optional<Admin> admin =  adminService.getAdmin(id);
    	
    	if(admin.isPresent()) {
    		
    		Admin admin2 = admin.get();
    		
    		
    		adminService.putapprove(emp, admin2, request.getIndex(), request.getDate());
    		
    		
    	}
    	
    }
    
    
    @PutMapping(path = "/handledisapprove/{id}") 
    public void putdisapprove(@PathVariable("id") String id, @RequestBody ApproveRequest request) {
    	
    	Employee emp = employeeService.getEmployeebyUsername(request.getUsername());
    	
    		
    	Optional<Admin> admin =  adminService.getAdmin(id);
    	
    	if(admin.isPresent()) {
    		
    		Admin admin2 = admin.get();
    		
    		
    		adminService.putdisapprove(emp, admin2, request.getIndex(), request.getDate());
    		
    		
    	}
    	
    }
    
    
    
    @PutMapping(path = "/disapprovepermission/{id}") 
    public void disapprovepermission(@PathVariable("id") String id, @RequestBody ApproveRequest request) {
    	
    	Employee emp = employeeService.getEmployeebyUsername(request.getUsername());
    	
    		
    	Optional<Admin> admin =  adminService.getAdmin(id);
    	
    	if(admin.isPresent()) {
    		
    		Admin admin2 = admin.get();
    		
    		
    		adminService.disapprovepermission(emp, admin2, request.getIndex(), request.getDate());
    		
    		
    	}
    	
    }
    
    @PutMapping(path = "/approvepermission/{id}") 
    public void approvepermission(@PathVariable("id") String id, @RequestBody ApproveRequest request) {
    	
    	Employee emp = employeeService.getEmployeebyUsername(request.getUsername());
    	
    		
    	Optional<Admin> admin =  adminService.getAdmin(id);
    	
    	if(admin.isPresent()) {
    		
    		Admin admin2 = admin.get();
    		
    		
    		adminService.approvepermission(emp, admin2, request.getIndex(), request.getDate(), request.getReason());
    		
    		
    	}
    	
    }
   

}
