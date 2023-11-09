package com.cs395latest.config;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.cs395latest.Model.User;

public class UserDetailsImpl implements UserDetails {
	  private static final long serialVersionUID = 1L;

	  private String id;

	  private String username;

	  private String email;

	  private String password;

	  private Collection<? extends GrantedAuthority> authorities;

	  public UserDetailsImpl(String id, String username, String password,
	      Collection<? extends GrantedAuthority> authorities) {
	    this.id = id;
	    this.username = username;
	    this.password = password;
	    this.authorities = authorities;
	  }

	  public static UserDetailsImpl build(User user) {
	        List<GrantedAuthority> authoritiesList = new ArrayList<>();
	        authoritiesList.add(new SimpleGrantedAuthority("user"));
	        return new UserDetailsImpl(user.getId(), user.getUsername(), user.getPassword(), authoritiesList);
	        
	  }

	  @Override
	  public Collection<? extends GrantedAuthority> getAuthorities() {
	    return authorities;
	  }

	  public String getId() {
	    return id;
	  }

	  public String getEmail() {
	    return email;
	  }

	  @Override
	  public String getPassword() {
	    return password;
	  }

	  @Override
	  public String getUsername() {
	    return username;
	  }

	  @Override
	  public boolean isAccountNonExpired() {
	    return true;
	  }

	  @Override
	  public boolean isAccountNonLocked() {
	    return true;
	  }

	  @Override
	  public boolean isCredentialsNonExpired() {
	    return true;
	  }

	  @Override
	  public boolean isEnabled() {
	    return true;
	  }
	  
}
