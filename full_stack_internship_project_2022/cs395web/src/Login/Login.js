import React, { useState, useEffect } from "react";
import "./Login.css"
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import axios from "axios";
import { toast } from "react-toastify";
import  { useNavigate } from 'react-router-dom'


const Login = () => {


  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const clickSubmit = async () => {

    const update = {

      username: username,
      password: password,

    };

    try {
      const res = await axios.post(
        "http://localhost:8080/api/login", update
      );

      console.log(res.data);

      localStorage.setItem("CurrentUser", res.data.accessToken);
      localStorage.setItem("User_ID", res.data.userId);


      if(res.data.message === "You are not an employee of the company") {

        toast.error("You are not an employee of the company", { position: toast.POSITION.TOP_CENTER });
      }
      else if(res.data.message === "Wrong Password or Username") {

        toast.error("Wrong Password or Username", { position: toast.POSITION.TOP_CENTER });

      }

      else {

        {
          res.data.user_role === "employee" ? 

          navigate("/employeehome", { replace: true })

          : 

          navigate("/adminhome", { replace: true })
        }

      }


    } catch (err) {}

  };
  


  return (
      <div className="signincontainer">
        <h1 style={{ fontFamily: "Open Sans", marginLeft: 50}}>LOGIN</h1>
        <div>
          <h className= "headers">USERNAME</h>
          <TextField
            id="username"
            type="username"
            label="Username"
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
          />
        </div>

        <div style = {{marginTop: '20px'}}>
          <h className= "headers">PASSWORD</h>
          <TextField
            id="password"
            type="password"
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />
        </div>

          <div style={{display:"flex", justifyContent:"space-between", width: "100px", marginLeft:"-20px"}}>
        <div>
          <Button variant="contained" onClick= {clickSubmit} style={{marginRight:"10px"}}> LOGIN </Button>
        </div>
        <div>
          <Button variant="contained" href="/register" style={{width:"160px"}}> GO TO REGISTER </Button>
        </div>
        </div>
      </div>
    );

}


export default Login;