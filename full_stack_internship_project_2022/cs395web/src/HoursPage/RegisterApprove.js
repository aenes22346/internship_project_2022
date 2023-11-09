import "./HoursPage.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";


const RegisterApprove = () => {


    const [arr, setArr] = useState([]);
    const [arrlength, setArrlength] = useState(0);

    const approveregister  = async (username, surname, name, password) => {

        console.log(arr);
  
        const update = {
  
            name: name,
            surname: surname,
            username: username,
            password: password,
  
    
        };
  
  
        try {
  
          const res = await axios.post("http://localhost:8080/admins/approveemployee/" + localStorage.getItem("User_ID"), update,
          { headers:  {'Authorization': localStorage.getItem("CurrentUser")} });
  
          window.location.reload();
  
        }
        
  
        catch (err) {}


    }


    const disapproveregister  = async (username) => {
  
        const update = {
  
            username: username,
  
    
        };
  
  
        try {
  
          const res = await axios.put("http://localhost:8080/admins/disapproveemployee/" + localStorage.getItem("User_ID"), update,
          { headers:  {'Authorization': localStorage.getItem("CurrentUser")} });
  
          window.location.reload();
  
        }
  
        catch (err) {}

        


    }



    useEffect(() => {
        const getAdmin = async () => {


          try {
            const res = await axios.get("http://192.168.1.4:8080/admins/get/" + localStorage.getItem("User_ID"),
            { headers:  {'Authorization': localStorage.getItem("CurrentUser")} });
            console.log(res.data);


            var holder = [];

            var count = 0;
            
            res.data.registerrequests.forEach(element => {
  
              var result = element.split(" ");

              count++;   

              holder.push({ id: count, username: result[0], name: result[1], surname: result[2], password: result[3]});
        
            });

            holder.reverse();

            setArr(holder);

            setArrlength(holder.length);


          } catch (err) {}
        };
        getAdmin();


      }, []);

      console.log(arr);


    return (



        <div className= "Row">


            <div className = "approval-container">

                <div>


                    {arr.registerrequests === null  || arrlength === 0 ? (
                    
                    <h1 style={{ padding: "50px", textAlign: "center", color:"#4287f5" }}>
                    You have no request waiting approval
                    </h1> 
                    ) : (


                        arr.map((item, index) => (


                            <div key={item.id} className="approval-column"
                            style={{ padding: "10px", margin: "20px" }}>


                            
                            <div>


                        <input
                          disabled="disabled"
                          type="text"
                          value={"Name: " + item.name}
                          style={{
                            color: "black",
                            borderRadius: "10px",
                            backgroundColor: "aliceblue",
                            marginLeft: "10px",
                            width: "150px",
                            border: "none",
                            outline: "none",
                          }}
                        ></input>



                            </div>


                            <div>


                            <input
                          disabled="disabled"
                          type="text"
                          value={"Username :"+ item.username}
                          style={{
                            color: "black",
                            borderRadius: "10px",
                            backgroundColor: "aliceblue",
                            marginLeft: "10px",
                            width: "150px",
                            border: "none",
                            outline: "none",
                          }}
                            ></input>


                            </div>



                            <div>


                            <input
                          disabled="disabled"
                          type="text"
                          value={"Surname :" + item.surname}
                          style={{
                            color: "black",
                            borderRadius: "10px",
                            backgroundColor: "aliceblue",
                            marginLeft: "10px",
                            width: "150px",
                            border: "none",
                            outline: "none",
                          }}
                        ></input>



                            </div>


                            <div>


                                <Button variant = "contained" onClick = {() => approveregister(item.username, item.surname, item.name, item.password)}>

                                    APPROVE


                                </Button>

                            </div>


                            <div style = {{marginLeft: "10px"}}>


                                <Button variant= "contained" onClick = {() => disapproveregister(item.username, item.surname, item.name, item.password)}>

                                    DISAPPROVE


                                </Button>

                                </div>



                            </div>


                        ))


                        )
                }

                </div>



            </div>



        </div>
    );


}

export default RegisterApprove;