import React, { useState, useEffect } from "react";
import "./Register.css"
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import axios from "axios";
import { toast } from "react-toastify";

export const Register = () => {


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");


  const clickSubmit = async () => {

    const update = {

      name: name,
      surname: surname,
      username: username,
      password: password,

    };


    try {
      const res = await axios.post(
        "http://localhost:8080/api/register", update
      );
      toast.success("Your request has been sent to admin", { position: toast.POSITION.TOP_CENTER });
    } catch (err) {toast.error("Username already exists", { position: toast.POSITION.TOP_CENTER })}



  };



  return (
    <div className="signincontainer1">
      <h1 style={{ fontFamily: "Open Sans", marginLeft: 20}}>REGISTER</h1>
      <div>
        <h className= "headers1">NAME</h>
        <TextField
          id="name"
          type="name"
          label="Name"
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
      </div>

      <div style = {{marginTop: '20px'}}>
        <h className= "headers1">SURNAME</h>
        <TextField
          id="surname"
          type="surname"
          label="Surname"
          onChange={(e) => setSurname(e.target.value)}
          margin="normal"
        />
      </div>
      <div style = {{marginTop: '20px'}}>
        <h className= "headers1">USERNAME</h>
        <TextField
          id="username"
          type="username"
          label="Username"
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
        />
      </div>

      <div style = {{marginTop: '20px'}}>
        <h className= "headers1">PASSWORD</h>
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
        <Button variant="contained" onClick= {clickSubmit} style={{marginRight:"10px"}}> REGISTER </Button>
      </div>
      <div>
        <Button variant="contained" href="/" style={{width:"130px"}}> GO TO LOGIN </Button>
      </div>
      </div>

    </div>
  );
}

