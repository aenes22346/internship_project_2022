import { Button } from "@material-ui/core";
import axios from "axios";
import { toast } from "react-toastify";
import React, { useState, useEffect } from "react";
import "./HoursPage.css";
import TextField from "@material-ui/core/TextField";



const HoursPage = () => {


    const [entry, setEntry] = useState("");
    const [exit, setExit] = useState("");
    const [getentry, setGetEntry] = useState("");
    const [getexit, setGetExit] = useState("");
    const [startDate, setStartDate] = useState("");


    function getFormattedDate(date) {
        var year = date.getFullYear();
      
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
      
        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        
        return month + '/' + day + '/' + year;
      }



    const getUserInfo = async () => {


        try {

            const res = await axios.get("http://localhost:8080/employee/get/" + localStorage.getItem("User_ID"), 
            
            { headers:  {'Authorization': localStorage.getItem("CurrentUser")} });


            setGetEntry(res.data.start_hour);
            setGetExit(res.data.end_hour);
            
            const d = new Date();
            setStartDate(d);

        }

        catch (err) {}


    }



    useEffect(() => {
        getUserInfo();
      }, []);



    const handleClick = async () => {


        var result = getFormattedDate(startDate);



        const update = {

            start_hour: entry,
            end_hour: exit,
            start_date: result
      
          };



        try {
        await axios.put("http://localhost:8080/employee/put/" + localStorage.getItem("User_ID"), update,
        { headers:  {'Authorization': localStorage.getItem("CurrentUser")} });


        toast.success("You have successfully entered your values", { position: toast.POSITION.TOP_CENTER });


        }
        catch (err) {}

    }


    return (

        <div style={{display: "flex", justifyContent: "center"}}>

        <div>

        <Button variant="contained" style={{marginTop: "60px", marginLeft: "50px"}} href = "/employeehome"> GO BACK </Button>

        </div>


        <div className = "container">


            <div className= "container2">  


                YOUR ENTRY HOURS SHOULD BE :


                {getentry}



            </div>

            <div className= "container2">  


                YOUR EXIT HOURS SHOULD BE :


                {getexit}
                

            </div>


            <div style = {{color: "aqua"}}>  


                ENTER YOUR ENTRY TIME :

            </div>


            <div>
            <TextField
            label="Entry-Time"
            margin="normal"
            onChange={(e) => setEntry(e.target.value)}
            />
            </div>


            <div style = {{color: "aqua"}}>  


                ENTER YOUR EXIT TIME :

            </div>


            <div>
            <TextField
            label="Exit-Time"
            margin="normal"
            onChange={(e) => setExit(e.target.value)}
            />
            </div>


            <Button variant= "contained" style= {{marginLeft: "80px"}} onClick = {handleClick}>  


                ENTER

            </Button>





        </div>


        </div>



    );





}


export default HoursPage;