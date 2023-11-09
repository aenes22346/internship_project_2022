import React from "react";
import { Button } from "@material-ui/core";
import "./Home.css";
import axios from "axios";
import { toast } from "react-toastify";
import  { useNavigate } from 'react-router-dom'

const EmployeeHome = () => {



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
            <Button variant="contained" href = "/hourspage"> SEE YOUR WORKING HOURS WITH ENTRY AND EXIT TIME </Button>
            </div>

            <br/>

            <div>
            <Button variant="contained" href = "/permissionpage"> ENTER A DATE AND REQUEST PERMISSION </Button>
            </div>

            <br/>

            <div>
            <Button variant="contained" style={{height: "50px", width: "250px"}} href = "/notification"> SEE NOTIFICATIONS </Button>
            </div>

            <br/>

            <div>
            <Button variant="contained" style={{height: "50px", width: "250px"}} href = "/excusepage"> ENTER EXCUSE FOR DAYS </Button>
            </div>

            <br/>

            <div>
            <Button variant="contained" href = "/tableinfo"> SEE YOUR ENTRY EXIT ACTIVITIES </Button>
            </div>

        </div>


        <div>

            <Button variant="contained" style={{marginTop: "60px", marginRight: "50px"}} onClick = {handleClick}> LOGOUT </Button>

        </div>

        </div>
    );



}

export default EmployeeHome;
