package com.cs395latest.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.AllArgsConstructor;
import com.cs395latest.Model.Admin;
import com.cs395latest.Model.Employee;
import com.cs395latest.Repository.AdminRepository;
import com.cs395latest.Repository.EmployeeRepository;
import com.cs395latest.config.UserRequest;

@Service
@AllArgsConstructor
@Transactional
public class AdminService {

	@Autowired
    private AdminRepository adminrepository;
	
	
	@Autowired
    private EmployeeRepository employeeRepository;
	
    @Autowired
    private PasswordEncoder passwordEncoder;


    public Admin addadmin(Admin admin) {
    	
    	admin.setBreak_time(1);
    	admin.setStart_hour(09.00);
    	admin.setEnd_hour(17.00);
    	admin.setUser_role("admin");
        return adminrepository.save(admin);
    }

    public List<Admin> getadmins() {
        return adminrepository.findAll();
    }

    public Optional<Admin> getAdmin(String id) {
    	return adminrepository.findById(id);
    }
    
    public Admin getAdminByUsername(String username) {
    	return adminrepository.findByUsername(username);
    } 
    
    
    
    public void putadmin(String id) {
    	
    	Optional<Admin> admin = adminrepository.findById(id);
    	
    	if(admin.isPresent()) {
    		
    		Admin admin2 = admin.get();
    		admin2.setAuthorityNum(admin2.getAuthorityNum() + 1);
    		adminrepository.save(admin2);
    	}

    }
    
    
    public void handlepermission(String name, String surname, String username, String dateresult, String permission) {
    	
    	
    	List<Admin> list = adminrepository.findAll();
    	
    	for (Admin admin : list) {
    		
    		ArrayList<String> ht2 = new ArrayList<String>();
    		
    		ArrayList<String> ht3 = admin.getPermission();
    		
    		if(ht3 == null) {
    			
	            ht2.add(username + " " + name + " " + surname + " " + dateresult + " " + permission);		
    			
    		}
    		
    		else {
    			
    			for (String elem : ht3) {
    				
    				ht2.add(elem);
    				
    			}
    			
    			ht2.add(username + " " + name + " " + surname + " " + dateresult + " " + permission);
    			
    		}
    	
            admin.setPermission(ht2);
    		adminrepository.save(admin);
    	}
    	
    	
    }
    
    public void handleexcuse(String name, String surname, String username, String dateresult, String excuse) {
    	
    	
    	List<Admin> list = adminrepository.findAll();
    	
    	for (Admin admin : list) {
    		
    		ArrayList<String> ht2 = new ArrayList<String>();
    		
    		ArrayList<String> ht3 = admin.getRequests();
    		
    		if(ht3 == null) {
    			
	            ht2.add(username + " " + name + " " + surname + " " + dateresult + " " + excuse);		
    			
    		}
    		
    		else {
    			
    			for (String elem : ht3) {
    				
    				ht2.add(elem);
    				
    			}
    			
    			ht2.add(username + " " + name + " " + surname + " " + dateresult + " " + excuse);
    			
    		}
    	
            admin.setRequests(ht2);
    		adminrepository.save(admin);
    	}
    	
    }
    
    public void putapprove(Employee emp, Admin admin, int index, String date) {
    	
    	
		ArrayList<String> newlist = new ArrayList<String>();
		
		
		ArrayList<String> reqList = admin.getRequests();
		
		
		ArrayList<String> exlist = emp.getExcuses();
		
		
		ArrayList<String> notification = new ArrayList<String>();
		
		
		
		int appnum = admin.getApproveNum();
		
		
		
		for(int i = 0; i < reqList.size(); i++) {
			
			if(i !=  index) {
				
				newlist.add(reqList.get(i));
				
			}
		}
		
		admin.setRequests(newlist);
		appnum++;
		admin.setApproveNum(appnum);
		adminrepository.save(admin);
		
		
		if(emp.getNotifications() != null) {
		ArrayList<String> allnot = emp.getNotifications();
		allnot.add(admin.getUsername() + " has accepted your excuse request for date:" + date + ".");
		if(exlist != null) {
		for(String elem : exlist) {
			
			
			String[] result = elem.split(" ");
			
			if(result[0] == emp.getName() && result[3] == date) {
				
				elem = elem + " " + "A";
				
			}
		}
		}
		emp.setExcuses(exlist);
		emp.setNotifications(allnot);
		employeeRepository.save(emp);
		
		}
		
		else {
			
			notification.add(admin.getUsername() + " has accepted your excuse request for date:" + date + ".");
			if(exlist != null) {
			for(String elem : exlist) {
				
				
				String[] result = elem.split(" ");
				
				if(result[0] == emp.getName() && result[3] == date) {
					
					elem = elem + " " + "A";
					
				}
			}
			}
			emp.setExcuses(exlist);
			emp.setNotifications(notification);
			employeeRepository.save(emp);
			
		}
		
		
    }
    
    
    public void putdisapprove(Employee emp, Admin admin, int index, String date) {
    	
    	
		ArrayList<String> newlist = new ArrayList<String>();
		
		
		ArrayList<String> reqList = admin.getRequests();
		
		ArrayList<String> exlist = emp.getExcuses();
		
		
		ArrayList<String> notification = new ArrayList<String>();
		
		
		
		int disappnum = admin.getDisapproveNum();
		
		
		
		for(int i = 0; i < reqList.size(); i++) {
			
			if(i !=  index) {
				
				newlist.add(reqList.get(i));
				
			}
		}
		
		admin.setRequests(newlist);
		disappnum++;
		admin.setDisapproveNum(disappnum);
		adminrepository.save(admin);
		
		
		if(emp.getNotifications() != null) {
		ArrayList<String> allnot = emp.getNotifications();
		allnot.add(admin.getUsername() + " has rejected your excuse request for date:" + date + ".");
		if(exlist != null) {
		for(String elem : exlist) {
			
			
			String[] result = elem.split(" ");
			
			if(result[0] == emp.getName() && result[3] == date) {
				
				elem = elem + " " + "D";
				
			}
		}
		}
		emp.setExcuses(exlist);
		emp.setNotifications(allnot);
		employeeRepository.save(emp);
		
		}
		
		else {
			
			notification.add(admin.getUsername() + " has rejected your excuse request for date:" + date + ".");
			if(exlist != null) {
			for(String elem : exlist) {
				
				
				String[] result = elem.split(" ");
				
				if(result[0] == emp.getName() && result[3] == date) {
					
					elem = elem + " " + "D";
					
				}
			}
			}
			emp.setExcuses(exlist);
			emp.setNotifications(notification);
			employeeRepository.save(emp);
			
		}
		
		
    }
    
    
    public void approvepermission(Employee emp, Admin admin, int index, String date, String reason) {
    	
    	
		ArrayList<String> newlist = new ArrayList<String>();
		
		
		ArrayList<String> reqList = admin.getPermission();
		
		
		ArrayList<String> notification = new ArrayList<String>();
		
		ArrayList<String> exlist2 = new ArrayList<String>();
		
		
		
		int appnum = admin.getApproveNum();
		
		
		
		for(int i = 0; i < reqList.size(); i++) {
			
			if(i !=  index) {
				
				newlist.add(reqList.get(i));
				
			}
		}
		
		admin.setPermission(newlist);
		appnum++;
		admin.setApproveNum(appnum);
		adminrepository.save(admin);
		
		if(emp.getTable_info() != null) {
			
			ArrayList<String> exlist = emp.getTable_info();
			
			exlist.add(reason + " " + "A");
			emp.setTable_info(exlist);
			
		}
		
		else {
			
			exlist2.add(reason + " " + "A");
			emp.setTable_info(exlist2);
		}
		
		
		if(emp.getNotifications() != null) {
		ArrayList<String> allnot = emp.getNotifications();
		allnot.add(admin.getUsername() + " has accepted your permission request for date:" + date + ".");
	
		emp.setPermissions(emp.getPermissions() - 1);
		emp.setNotifications(allnot);
		employeeRepository.save(emp);
		
		}
		
		else {
			
			notification.add(admin.getUsername() + " has accepted your permission request for date:" + date + ".");
			
			emp.setPermissions(emp.getPermissions() - 1);
			emp.setNotifications(notification);
			employeeRepository.save(emp);
			
		}
		
		
    }
    
    
    public void disapprovepermission(Employee emp, Admin admin, int index, String date) {
    	
    	
		ArrayList<String> newlist = new ArrayList<String>();
		
		ArrayList<String> reqList = admin.getPermission();
		
		
		ArrayList<String> notification = new ArrayList<String>();
		
		
		
		int disappnum = admin.getDisapproveNum();
		
		
		
		for(int i = 0; i < reqList.size(); i++) {
			
			if(i !=  index) {
				
				newlist.add(reqList.get(i));
				
			}
		}
		
		admin.setRequests(newlist);
		disappnum++;
		admin.setDisapproveNum(disappnum);
		adminrepository.save(admin);
		
		
		if(emp.getNotifications() != null) {
		ArrayList<String> allnot = emp.getNotifications();
		allnot.add(admin.getUsername() + " has rejected your permission request for date:" + date + ".");
		emp.setNotifications(allnot);
		employeeRepository.save(emp);
		
		}
		
		else {
			
			notification.add(admin.getUsername() + " has rejected your permission request for date:" + date + ".");
			emp.setNotifications(notification);
			employeeRepository.save(emp);
			
		}
		
		
    }
    
    
    
    
    
    public void increasecustnum(Admin admin, Employee employee, double entry, double exit) {
    	
    	admin.setCustomizeNum(admin.getCustomizeNum() + 1);
    	adminrepository.save(admin);
    	
    	employee.setEnd_hour(exit);
    	employee.setStart_hour(entry);
    	ArrayList<String> notification = new ArrayList<String>();
    	
		if(employee.getNotifications() != null) {
		ArrayList<String> allnot = employee.getNotifications();
		allnot.add(admin.getUsername() + " has changed your working hours from " + entry + "to " + exit + ".");
		employee.setNotifications(allnot);
		
		}
		
		else {
			
			notification.add(admin.getUsername() + " has changed your working hours from " + entry + "to " + exit + ".");
			employee.setNotifications(notification);
			
		}
    	employeeRepository.save(employee);
    	
    }
    
    public void getregister(UserRequest req) {
    	
    	List<Admin> list = adminrepository.findAll();
    	
    	
    	for(Admin admin : list) {
    		
    		
    		ArrayList<String> ht2 = new ArrayList<String>();
    		
    		ArrayList<String> ht3 = admin.getRegisterrequests();
    		
    		if(ht3 == null) {
    			
	            ht2.add(req.getUsername() + " " + req.getName() + " " + req.getSurname() + " " + passwordEncoder.encode(req.getPassword()));		
    			
    		}
    		
    		else {
    			
    			for (String elem : ht3) {
    				
    				ht2.add(elem);
    				
    			}
    			
    			ht2.add(req.getUsername() + " " + req.getName() + " " + req.getSurname() + " " + passwordEncoder.encode(req.getPassword()));
    			
    		}
    	
            admin.setRegisterrequests(ht2);
    		adminrepository.save(admin);
    		
    	}
    	
    	
    }
    
    
    public void newregister(Admin admin, String name) {

		ArrayList<String> newlist = new ArrayList<String>();
		
		
		ArrayList<String> reqList = admin.getRegisterrequests();
		
		List<Admin> list = adminrepository.findAll();
		
		
		
		for(String elem : reqList) {
			
			String[] result = elem.split(" ");
			
			if(!result[0].equals(name)) {
				
				newlist.add(elem);
				
			}	
			
		}
		
		for(Admin admin2 : list) {
			
			admin2.setRegisterrequests(newlist);
			adminrepository.save(admin2);
		}
    	
    }
    

}