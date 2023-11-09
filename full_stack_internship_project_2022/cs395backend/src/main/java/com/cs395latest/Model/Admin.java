package com.cs395latest.Model;

import java.util.ArrayList;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "admin")
public class Admin{

	
	
	
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
	
	
	private int AuthorityNum;
	
	
	private int ApproveNum;
	
	
	private int DisapproveNum;
	
	
	private int CustomizeNum;

	
	private ArrayList<String> requests;
	
	private ArrayList<String> permission;
	
	private ArrayList<String> registerrequests;

	public Admin() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Admin(String id, String name, String surname, String username, String password, String user_role,
			double start_hour, double end_hour, int break_time, int authorityNum, int approveNum, int disapproveNum,
			int customizeNum, ArrayList<String> requests, ArrayList<String> permission,
			ArrayList<String> registerrequests) {
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
		AuthorityNum = authorityNum;
		ApproveNum = approveNum;
		DisapproveNum = disapproveNum;
		CustomizeNum = customizeNum;
		this.requests = requests;
		this.permission = permission;
		this.registerrequests = registerrequests;
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

	public int getAuthorityNum() {
		return AuthorityNum;
	}

	public void setAuthorityNum(int authorityNum) {
		AuthorityNum = authorityNum;
	}

	public int getApproveNum() {
		return ApproveNum;
	}

	public void setApproveNum(int approveNum) {
		ApproveNum = approveNum;
	}

	public int getDisapproveNum() {
		return DisapproveNum;
	}

	public void setDisapproveNum(int disapproveNum) {
		DisapproveNum = disapproveNum;
	}

	public int getCustomizeNum() {
		return CustomizeNum;
	}

	public void setCustomizeNum(int customizeNum) {
		CustomizeNum = customizeNum;
	}

	public ArrayList<String> getRequests() {
		return requests;
	}

	public void setRequests(ArrayList<String> requests) {
		this.requests = requests;
	}

	public ArrayList<String> getPermission() {
		return permission;
	}

	public void setPermission(ArrayList<String> permission) {
		this.permission = permission;
	}

	public ArrayList<String> getRegisterrequests() {
		return registerrequests;
	}

	public void setRegisterrequests(ArrayList<String> registerrequests) {
		this.registerrequests = registerrequests;
	}
	
	
	
}
