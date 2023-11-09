import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import axios from "axios";
import { toast } from "react-toastify";


const PermissionPage = () => {


    const [startDate, setStartDate] = useState(new Date());
    const[permission, setPermission] = useState("");


    function getFormattedDate(date) {
        var year = date.getFullYear();
      
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
      
        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        
        return month + '/' + day + '/' + year;
      }


    function handletext(val) {
        setPermission(val.target.value);
    }




    const sendpermission = async () => {




        var result = getFormattedDate(startDate);

        console.log(startDate);

        console.log(result);

        console.log(permission);


        const update = {

            result: result,
            permission: permission,
      
        };


        try {

            await axios.put("http://localhost:8080/admins/send/" + localStorage.getItem("User_ID"), update,
            { headers:  {'Authorization': localStorage.getItem("CurrentUser")} });



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

            SELECT A DATE FROM BELOW:

        </div>

        <div style = {{marginLeft: "40px", marginTop: "10px"}}>
        <DatePicker selected={startDate} onChange={(date:Date) => setStartDate(date)}/>


        </div>


        <div>

            <textarea


            onChange= {handletext}
            placeholder=" Write your permission reason here..."
              rows="4"
              cols="30"
              style={{
                resize: "none",
                borderWidth: "bold",
                borderRadius: "10px",
                outline: "none",
                marginTop: "150px"
              }}>


            </textarea>

        </div>


        <Button variant= "contained" style= {{marginLeft: "80px", marginTop: "10px"}} onClick = {sendpermission}>  


            SEND

        </Button>


        </div>

        </div>


    );




}


export default PermissionPage;