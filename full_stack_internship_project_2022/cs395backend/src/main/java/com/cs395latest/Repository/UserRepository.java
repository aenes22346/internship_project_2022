package com.cs395latest.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.cs395latest.Model.User;

@Repository
@Component
public interface UserRepository extends MongoRepository<User, String>{
	
	User findByUsername(String username);

}
