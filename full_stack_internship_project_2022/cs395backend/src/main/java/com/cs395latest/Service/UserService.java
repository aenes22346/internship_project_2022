package com.cs395latest.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.cs395latest.Model.User;
import com.cs395latest.Repository.UserRepository;

import lombok.AllArgsConstructor;


@Service
@AllArgsConstructor
public class UserService{

	
	@Autowired
	private UserRepository userRepository;
	
	
    public User adduser(User user) {
        return userRepository.save(user);
    }
    
    
    public void deletePersonUsingId(String id) {
    	userRepository.deleteById(id);
    }
    
    
    public User getuserByUsername(String username) {
    	return userRepository.findByUsername(username);
    }
   
       
}
