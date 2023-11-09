import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Bar } from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto'
import { Button } from "@material-ui/core";

const TableInfo = () => {


  let holder2 = [];


  const [chartData, setChartData] = useState({
    datasets: [],
  });


  const [refreshdata, setrefreshData] = useState([]);

  const [start, setStart] = useState();

  const [end, setEnd] = useState();


  function clickfunction (starting, ending) {

    if(starting < 0) {

      setStart(0);
      setEnd(ending);
      starting = 0;

    }

    else if(ending < 0) {

      return;
    }

    else if(starting > refreshdata.length) {

      return;
    }

    else if(ending > refreshdata.length) {

      setStart(starting);
      setEnd(refreshdata.length);
      ending = refreshdata.length;
    }

    else {
      setStart(starting);
      setEnd(ending);
    }

    console.log(start, end);

    setChartData({
      labels: refreshdata.slice(starting, ending).map((item) => item[1]),
      datasets: [{
          label: "Entry Hour",
          backgroundColor: 'rgba(194, 116, 161, 0.5)',
          data: refreshdata.slice(starting, ending).map((item) => item[2]), 
          borderWidth: 3                  
      },
      {
        label: "Exit Hour",
        backgroundColor: 'rgba(71, 225, 167, 0.5)',
        data: refreshdata.slice(starting, ending).map((item) => item[3]), 
        borderWidth: 3                  
      },
      {
        label: "Total Hour",
        backgroundColor: 'rgba(240, 232, 7)',
        data: refreshdata.slice(starting, ending).map((item) => item[4]), 
        borderWidth: 3                  
      },
    
      {
        label: "Required Min Time",
        backgroundColor: 'rgba(240, 23, 7)',
        data: refreshdata.slice(starting, ending).map((item) => item[6]), 
        borderWidth: 3                  
      }]
    });

  }


  useEffect(() => {

    const getUserInfo = async () => {


      try {

          const res = await axios.get("http://localhost:8080/employee/get/" + localStorage.getItem("User_ID"), 
          
          { headers:  {'Authorization': localStorage.getItem("CurrentUser")} });


          let holder = [];
          
          res.data.table_info.forEach(element => {

            var result = element.split(" ");

            holder.push(result);
      
          });


          holder2 = holder;

          setrefreshData(holder2);


          setStart(holder2.length - 5);
          setEnd(holder2.length);


          console.log(holder2.length - 5, holder2.length);


          setChartData({
            labels: holder2.slice(holder2.length - 5, holder2.length).map((item) => item[1]),
            datasets: [{
                label: "Entry Hour",
                backgroundColor: 'rgba(194, 116, 161, 0.5)',
                data: holder2.slice(holder2.length - 5, holder2.length).map((item) => item[2]), 
                borderWidth: 3                  
            },
            {
              label: "Exit Hour",
              backgroundColor: 'rgba(71, 225, 167, 0.5)',
              data: holder2.slice(holder2.length - 5, holder2.length).map((item) => item[3]), 
              borderWidth: 3                  
            },
            {
              label: "Total Hour",
              backgroundColor: 'rgba(240, 232, 7)',
              data: holder2.slice(holder2.length - 5, holder2.length).map((item) => item[4]), 
              borderWidth: 3                  
            },
          
            {
              label: "Required Min Time",
              backgroundColor: 'rgba(240, 23, 7)',
              data: holder2.slice(holder2.length - 5, holder2.length).map((item) => item[6]), 
              borderWidth: 3                  
            }]
          });


      }

      catch (err) {}
    };

    getUserInfo();

  }, []);

  return (


    <div>

    <div>

      <Button  onClick = {() => clickfunction(start - 5, end - 5)} variant= "contained" style = {{marginTop: "50px", marginLeft: "450px"}}>

      PREVIOUS WEEK

      </Button>

      <Button  onClick = {() => clickfunction(start + 5, end + 5)} variant= "contained" style = {{marginTop: "50px", marginLeft: "20px"}}>

      NEXT WEEK

      </Button>


    </div>

    <div>

      <Bar data={chartData} options={{ responsive: true }} style = {{maxWidth: "500px", maxHeight: "500px", marginLeft: "350px", marginTop: "50px"}}/>

    </div>

    </div>

  );
};

export default TableInfo;