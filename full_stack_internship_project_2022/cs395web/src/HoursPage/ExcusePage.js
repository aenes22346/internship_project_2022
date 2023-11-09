import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import "./HoursPage.css";
import axios from "axios";
import { Button } from "@material-ui/core";

function ExcusePage() {


    const [refreshdata, setrefreshData] = useState([]);
    const [clicked, setClicked] = useState(false);
    const [rowdata, setRowdata] = useState("");
    const[excuse, setExcuse] = useState("");


    function clickfunction(params) {
      setClicked(clicked => !clicked);
      setRowdata(params);

    }


    function handletext(val) {
      setExcuse(val.target.value);
  }


  const sendclick = async () => {



    const update = {

      date: rowdata,
      excuse: excuse,
    };


    try {

      await axios.put("http://localhost:8080/admins/send/excuse/" + localStorage.getItem("User_ID"), update,
      { headers:  {'Authorization': localStorage.getItem("CurrentUser")} });



    }

    catch (err) {}




  }


    const columns = [
        {
          field: "date",
          headerName: "DATE",
          width: 150,
        },
        {
          field: "entrytime",
          headerName: "ENTRY-TIME",
          width: 200,
        },
        {
          field: "exittime",
          headerName: "EXIT-TIME",
          width: 200,
        },
        {
            field: "workedhours",
            headerName: "WORKED-HOURS",
            width: 200,
        },

        {
            field: "minrequiredtime",
            headerName: "MIN-REQUIRED-TIME",
            width: 200,
        },
        {
            field: "buttonresult",
            headerName: "ENTER-EXCUSE",
            width: 230,
            renderCell: (params) => { 
                
                return (


                    params.row.minrequiredtime > params.row.workedhours ? (

                    
                    <Button style={{backgroundColor: "red"}} onClick = {() => clickfunction(params.row.date)}>

                        ENTER AN EXCUSE

                    </Button>

                    ) : (


                        <Button style={{backgroundColor: "green", fontSize: "10px", color: "white", height: "40px"}}>

                        NO NEED TO ENTER EXCUSE

                    </Button>


                    )


                );
            }
        },
        

    ];


    useEffect(() => {

        const getUserInfo = async () => {
    
    
          try {
    
              const res = await axios.get("http://localhost:8080/employee/get/" + localStorage.getItem("User_ID"), 
              
              { headers:  {'Authorization': localStorage.getItem("CurrentUser")} });
    
    
              var holder = [];

              var count = 0;
              
              res.data.table_info.forEach(element => {
    
                var result = element.split(" ");

                count++;   

                holder.push({ id: count, date: result[1], entrytime: result[2], exittime: result[3], workedhours: result[4], minrequiredtime: result[6]});
          
              });

              holder.reverse();
              setrefreshData(holder);

          }
    
          catch (err) {}
        };
    
        getUserInfo();
    
      }, []);

    return (


      <div>

        <Container sx={{ height: 500, width: 800, marginTop: 10 }}>
        <DataGrid
          pageSize={5}
          headerHeight={75}
          rowHeight={65}
          getRowId={(row) => row.id}
          columns={columns}
          rows={refreshdata}
          disableSelectionOnClick
        />
        </Container>


        { clicked ? (


          <div className= "container">


            <div style = {{color: "blue", fontWeight: "bold"}}>

            SELECTED DATE IS : {rowdata}

            </div>

          <div>

          <textarea
          onChange= {handletext}
          placeholder=" Write your excuse reason here..."
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


          <Button variant= "contained" style= {{marginLeft: "80px", marginTop: "10px"}} onClick = {sendclick}>  

            SEND

          </Button>

          </div>


        ) : (

          <>

          </>
        )


        }


      </div>
    );


}

export default ExcusePage;