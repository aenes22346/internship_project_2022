package com.cs395latest.Repository;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.cs395latest.Model.Admin;

@Repository
@Component
public interface AdminRepository extends MongoRepository<Admin, String>{
	
	
	Admin findByUsername(String username);

}
