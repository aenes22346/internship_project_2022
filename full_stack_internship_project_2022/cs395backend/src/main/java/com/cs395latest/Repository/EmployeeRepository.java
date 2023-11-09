package com.cs395latest.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.cs395latest.Model.Employee;

@Repository
@Component
public interface EmployeeRepository extends MongoRepository<Employee, String>{
	
	Employee findByUsername(String username);

}
