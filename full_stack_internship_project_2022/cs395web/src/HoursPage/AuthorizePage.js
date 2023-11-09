import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import axios from "axios";
import { toast } from "react-toastify";
import Select from 'react-select';


const AuthorizePage = () => {


    const [index, setIndex] = useState(null);
    const [allemployees, setAll] = useState([]);
    const [query, setQuery] = useState("");



    const handlechange = selectedoption => {

      setIndex(selectedoption.value);
    }



    useEffect(() => {
        const getAllEmployees = async () => {
          try {
            const res = await axios.get("http://localhost:8080/employee", 
            { headers:  {'Authorization': localStorage.getItem("CurrentUser")}});
            setAll(res.data);
          } catch (err) {}
        };
        getAllEmployees();
      }, []);


      const sendauthorization = async () => {

        console.log(allemployees[index].id);

        const update = {

          userid: allemployees[index].id
    
        };



        try {

          await axios.put("http://localhost:8080/admins/put/" + localStorage.getItem("User_ID"), 

          
          { headers:  {'Authorization': localStorage.getItem("CurrentUser")} });



      }

      catch (err) {}

    }



    return (



        <div style={{display: "flex", justifyContent: "center"}}>

        <div>

        <Button variant="contained" style={{marginTop: "60px", marginLeft: "50px"}} href = "/adminhome"> GO BACK </Button>

        </div>

        <div className = "container">



            <div className= "container2">


                CHOOSE A PERSON FOR ADMIN ROLE:


            </div>


            <Select onChange = {handlechange} options = {allemployees.map((item, i) => {


              return {
                  label: "Name: " + item.name.charAt(0).toUpperCase() + item.name.slice(1) + " - " + "Surname: " + item.surname.charAt(0).toUpperCase() + item.surname.slice(1),
                  value: i,
              };}
            )}/>






            <Button variant= "contained" style= {{marginLeft: "65px", marginTop: "200px"}} onClick = {sendauthorization}>  


                AUTHORIZE

            </Button>

         </div>

        </div>
    );




}


export default AuthorizePage;


