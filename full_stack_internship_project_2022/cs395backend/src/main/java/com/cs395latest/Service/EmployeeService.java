package com.cs395latest.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import com.cs395latest.Model.Employee;
import com.cs395latest.Repository.EmployeeRepository;
import com.cs395latest.Requests.PutRequest;

@Service
@AllArgsConstructor
public class EmployeeService {

	@Autowired
    private EmployeeRepository employeerepository;


    public Employee addemployee(Employee employee) {
    	employee.setPermissions(15);
    	employee.setBreak_time(1);
    	employee.setRequired_time(7);
    	employee.setStart_hour(9);
    	employee.setEnd_hour(17);
    	employee.setUser_role("employee");
        return employeerepository.save(employee);
    }

    public List<Employee> getemployees() {
        return employeerepository.findAll();
    }

    public Optional<Employee> getEmployee(String id) {
    	return employeerepository.findById(id);
    }

    public Employee getEmployeebyUsername(String username) {
    	return employeerepository.findByUsername(username);
    }
    

    public void deletePersonUsingId(String id) {
    	employeerepository.deleteById(id);
    }
    
    public void putemployee(String id, PutRequest request) {
    	
    	Optional<Employee> employee = employeerepository.findById(id);
    	
    	if(employee.isPresent()) {
    		
    		Employee emp = employee.get();
    		ArrayList<String> ht2
            = new ArrayList<String>();
    		  		
            
            double d = (request.getEnd_hour() - request.getStart_hour() - emp.getBreak_time());
            
            String answer;
            
            if(d >= emp.getRequired_time()) {
            	
            	answer = "Y";
            	
            }
            
            else {
            	
            	answer = "S";
            }
            
            if(emp.getTable_info() == null) {
            	
                ht2.add(emp.getUsername() + " " + request.getStart_date() + " " + request.getStart_hour()
                + " " + request.getEnd_hour() + " " + String.valueOf(d) + " " + answer + " " + emp.getRequired_time());
            	
            }
            
            else {
            	
            	for(String elem : emp.getTable_info()) {
            		
            		
            		ht2.add(elem);
            	}
            	
                ht2.add(emp.getUsername() + " " + request.getStart_date() + " " + request.getStart_hour()
                + " " + request.getEnd_hour() + " " + String.valueOf(d) + " " + answer + " " + emp.getRequired_time());
            }
            

    		emp.setTable_info(ht2);
    		employeerepository.save(emp);
    	}

    }

}