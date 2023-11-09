import "./HoursPage.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";


const Notification = () => {


    const [notification, SetNotification] = useState([]);
    const [check, setCheck] = useState(false);
    const [arrlength, setArrlength] = useState(false);


    useEffect(() => {

        const getUserInfo = async () => {
    
    
          try {
    
              const res = await axios.get("http://localhost:8080/employee/get/" + localStorage.getItem("User_ID"),
              { headers:  {'Authorization': localStorage.getItem("CurrentUser")} });


              let holder = [];

              holder.push(res.data);

              setArrlength(holder.length);



              if(res.data.notifications === null) {

                setCheck(true);
              }

              else {
                console.log(res.data.notifications);
                SetNotification(res.data.notifications);
              }

          }
    
          catch (err) {}
        };
    
        getUserInfo();
    
      }, []);


    return (



        <div className= "Row">


            <div className = "approval-container">

                <div>


                    {notification === null  || arrlength === 0 ? (
                    
                    <h1 style={{ padding: "50px", textAlign: "center", color:"#4287f5" }}>
                    You have no request waiting approval
                    </h1> 
                    ) : (


                        notification.map((item, index) => (

                            <div>


                            <div key={item.id} className="approval-column"
                            style={{ padding: "10px", margin: "20px" }}>
                              <div>
                                {item}

                              </div>

                            </div>

                            </div>


                        )))
                }

                </div>



            </div>



        </div>
    );


}

export default Notification;