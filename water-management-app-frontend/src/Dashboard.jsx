import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from 'chart.js/auto';

const Dashboard = (prop) => {
  let id=localStorage.getItem("id");
  console.log(id);
  if (!id) {
    id=prop.id;
  } 
  const [myChart, setMyChart] = useState();
  const [year, setYear] = useState(new Date().getFullYear());
  const years = Array.from(new Array(20), (val, index) => new Date().getFullYear() - index);

  
  useEffect(() => {

      axios
        .get(`http://localhost:5000/api/consumption/${id}/${year}`)
        .then((response) => {
          var charty = document.getElementById('acquisitions');
            charty.style.visibility="visible";
            setMyChart(new Chart(
              document.getElementById('acquisitions'),
              {
                type: 'line',
                data: {
                  labels: response.data.map(row => row.month),
                  datasets: [
                    {
                      label: 'Consumption by month',
                      data: response.data.map(row => row.total_consumption)
                    }
                  ]
                }
              }
            ))
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
  }, [year]); // Empty array means this runs once when the component mounts



  return (
    <div>
      <h2>Consumption Data</h2>
      <select onChange={(event) => { myChart.destroy(); setYear(event.target.value) }}>
        {
          years.map((yea, index) => {
            return <option key={`year${index}`} value={yea}>{yea}</option>
          })
        }
      </select>
    </div>
  );
};

export default Dashboard;
