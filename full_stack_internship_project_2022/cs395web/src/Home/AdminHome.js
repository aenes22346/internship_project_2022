import React from "react";
import { Button } from "@material-ui/core";
import "./Home.css";
import axios from "axios";
import { toast } from "react-toastify";
import  { useNavigate } from 'react-router-dom'

const AdminHome = () => {


    let navigate = useNavigate();



    const handleClick = async () => {



        try {
            const res = await axios.get("http://localhost:8080/api/logout", { headers:  {'Authorization': localStorage.getItem("CurrentUser")} });
    
            localStorage.clear();

            console.clear();
            navigate(res.data, { replace: true });

    
            }
            catch (err) {toast.error("An error occured", { position: toast.POSITION.TOP_CENTER });}

    }


    return (


        <div style={{display: "flex", justifyContent: "center"}}>

        <div className="container">


            <br/>

            <div>
            <Button variant="contained" style={{height: "50px", width: "250px"}} href = "/authorizepage"> AUTHORIZE AN ADMIN </Button>
            </div>

            <br/>

            <div>
            <Button variant="contained" style={{height: "50px", width: "250px"}}> CHANGE WORKING HOUR FOR SELECTED EMPLOYEE </Button>
            </div>

            <br/>

            <div>
            <Button variant="contained" style={{height: "50px", width: "250px"}} href = "/excuseapprove"> APPROVE DISAPPROVE EMPLOYEE EXCUSES </Button>
            </div>

            <br/>

            <div>
            <Button variant="contained" style={{height: "50px", width: "250px"}} href = "/permissionapprove"> APPROVE DISAPPROVE EMPLOYEE PERMISSIONS </Button>
            </div>

            <br/>

            <div>
            <Button variant="contained" style={{height: "50px", width: "250px"}} href = "/registerapprove"> APPROVE DISAPPROVE EMPLOYEE REGISTER REQUESTS </Button>
            </div>

            <br/>

            <div>
            <Button variant="contained" style={{height: "50px", width: "250px"}}> DELETE AN EMPLOYEE </Button>
            </div>

            <br/>

            <div>
            <Button variant="contained" style={{height: "50px", width: "250px"}}> SEE ADMIN'S ACTIVITIES </Button>
            </div>


            </div>

            <div>

            <Button variant="contained" style={{marginTop: "60px", marginRight: "50px"}} onClick = {handleClick}> LOGOUT </Button>

            </div>


            </div>

    );



}

export default AdminHome;
