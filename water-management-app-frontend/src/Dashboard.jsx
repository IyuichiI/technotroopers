import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from 'chart.js/auto';

const ConsumptionData = () => {
  const [data, setData] = useState([]);
  const [myChart, setMyChart] = useState();
  const [year, setYear] = useState(new Date().getFullYear());
  const years = Array.from(new Array(20), (val, index) => new Date().getFullYear() - index);

  useEffect(() => {
    setTimeout(() => {

      axios
        .get(`http://localhost:5000/api/consumption/39/${year}`)
        .then((response) => {
          setData(response.data);
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
    }, 0);
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

export default ConsumptionData;
