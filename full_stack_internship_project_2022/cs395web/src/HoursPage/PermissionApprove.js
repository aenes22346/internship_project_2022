import "./HoursPage.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";


const PermissionApprove = () => {


    const [arr, setArr] = useState([]);
    const [arrlength, setArrlength] = useState(0);



    const handleapprove = async (username, index) => {


        console.log(username);
        console.log(index);
        console.log(arr[index].date);



        const update = {

            index: index,
            username: username,
            date: arr[index].date
        }


        try {

            await axios.put("http://localhost:8080/admins/approvepermission/" + localStorage.getItem("User_ID"), update,
            { headers:  {'Authorization': localStorage.getItem("CurrentUser")} });


            window.location.reload();
      
          }
      
          catch (err) {}

    }
    
    const handledisapprove = async (username, index) => {


      console.log(username);
      console.log(index);
      console.log(arr[index].date);



      const update = {

          index: index,
          username: username,
          date: arr[index].date
      }


      try {

          await axios.put("http://localhost:8080/admins/disapprovepermission/" + localStorage.getItem("User_ID"), update,
          { headers:  {'Authorization': localStorage.getItem("CurrentUser")} });


          window.location.reload();
    
        }
    
        catch (err) {}

  }



    useEffect(() => {
        const getAdmin = async () => {
          try {
            const res = await axios.get("http://localhost:8080/admins/get/" + localStorage.getItem("User_ID"), 
            { headers:  {'Authorization': localStorage.getItem("CurrentUser")}});
            console.log(res.data);


            var holder = [];

            var count = 0;
            
            res.data.permission.forEach(element => {
  
              var result = element.split(" ");

              count++;   

              holder.push({ id: count, name: result[0], surname: result[1], username: result[2], date: result[3], permission: result[4]});
        
            });

            holder.reverse();

            setArr(holder);

            setArrlength(holder.length);


          } catch (err) {}
        };
        getAdmin();


      }, []);


    return (



        <div className= "Row">


            <div className = "approval-container">

                <div>


                    {arr.requests === null  || arrlength === 0 ? (
                    
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


                                <input
                                disabled="disabled"
                                type="text"
                                value={"Date :" + item.date}
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
                                value={"Excuse :" + item.permission}
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


                                <Button variant = "contained" onClick = {() => handleapprove(item.username, index)}>

                                    APPROVE


                                </Button>

                            </div>


                            <div style = {{marginLeft: "10px"}}>


                                <Button variant= "contained" onClick = {() => handledisapprove(item.username, index)}>

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

export default PermissionApprove;