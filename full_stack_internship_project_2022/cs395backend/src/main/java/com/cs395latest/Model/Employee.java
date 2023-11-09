package com.cs395latest.Model;


import java.util.ArrayList;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "employee")
public class Employee {
	
	
	
	@Id
	private String id;
	
	private String name;
	
	
	private String surname;
	
	
	private String username;
	
	
	private String password;
	
	
	private String user_role;
	
	
	private double start_hour;
	
	
	private double end_hour;
	
	
	private int break_time;
	
	
	private  ArrayList<String> notifications;
	
	
	private int permissions;
	
	
	private double required_time;
	
	
	private ArrayList<String> excuses;
	
	
	private ArrayList<String> table_info;


	public Employee() {
		super();
		// TODO Auto-generated constructor stub
	}


	public Employee(String id, String name, String surname, String username, String password, String user_role,
			double start_hour, double end_hour, int break_time, ArrayList<String> notifications, int permissions,
			double required_time, ArrayList<String> excuses, ArrayList<String> table_info) {
		super();
		this.id = id;
		this.name = name;
		this.surname = surname;
		this.username = username;
		this.password = password;
		this.user_role = user_role;
		this.start_hour = start_hour;
		this.end_hour = end_hour;
		this.break_time = break_time;
		this.notifications = notifications;
		this.permissions = permissions;
		this.required_time = required_time;
		this.excuses = excuses;
		this.table_info = table_info;
	}


	public String getId() {
		return id;
	}


	public void setId(String id) {
		this.id = id;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getSurname() {
		return surname;
	}


	public void setSurname(String surname) {
		this.surname = surname;
	}


	public String getUsername() {
		return username;
	}


	public void setUsername(String username) {
		this.username = username;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}


	public String getUser_role() {
		return user_role;
	}


	public void setUser_role(String user_role) {
		this.user_role = user_role;
	}


	public double getStart_hour() {
		return start_hour;
	}


	public void setStart_hour(double start_hour) {
		this.start_hour = start_hour;
	}


	public double getEnd_hour() {
		return end_hour;
	}


	public void setEnd_hour(double end_hour) {
		this.end_hour = end_hour;
	}


	public int getBreak_time() {
		return break_time;
	}


	public void setBreak_time(int break_time) {
		this.break_time = break_time;
	}


	public ArrayList<String> getNotifications() {
		return notifications;
	}


	public void setNotifications(ArrayList<String> notifications) {
		this.notifications = notifications;
	}


	public int getPermissions() {
		return permissions;
	}


	public void setPermissions(int permissions) {
		this.permissions = permissions;
	}


	public double getRequired_time() {
		return required_time;
	}


	public void setRequired_time(double required_time) {
		this.required_time = required_time;
	}


	public ArrayList<String> getExcuses() {
		return excuses;
	}


	public void setExcuses(ArrayList<String> excuses) {
		this.excuses = excuses;
	}


	public ArrayList<String> getTable_info() {
		return table_info;
	}


	public void setTable_info(ArrayList<String> table_info) {
		this.table_info = table_info;
	}
	
	
	

}
