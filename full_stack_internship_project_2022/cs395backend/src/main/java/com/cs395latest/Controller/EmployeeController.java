package com.cs395latest.Controller;

import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import com.cs395latest.Model.Employee;
import com.cs395latest.Requests.PutRequest;
import com.cs395latest.Service.EmployeeService;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;


@CrossOrigin
@RestController
@RequestMapping("/employee")
@AllArgsConstructor
public class EmployeeController {

	
	@Autowired
    private EmployeeService employeeService;


    @PostMapping
    public Employee createemployee(@RequestBody Employee employee) {
        return employeeService.addemployee(employee);
    }

    @GetMapping
    public List<Employee> getemployee() {
        return employeeService.getemployees();
    }
    
    @GetMapping(path = "/get/{id}")
    public Optional<Employee> getoneemployee(@PathVariable("id") String id) {
        return employeeService.getEmployee(id);
    }
    

    @DeleteMapping(path = "/delete/{id}")
    public void delete(@PathVariable("id") String id){
    	employeeService.deletePersonUsingId(id);
    }
    
    
    
    @PutMapping(path = "/put/{id}")
    public void put(@PathVariable("id") String id, @RequestBody PutRequest request) {
    	
    	employeeService.putemployee(id, request);   	
    	
    }


}
