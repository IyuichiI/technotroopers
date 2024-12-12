import React, { useState } from "react";
import { Link } from "react-router-dom";
import Chart from 'chart.js/auto';

function Dashboard(){
    const [year,setYear]=useState(new Date().getFullYear());
    const years = Array.from(new Array(20),( val, index) => new Date().getFullYear()-index);
    (async function() {
        const data = [
          { month: "JAN", consumption: 10 },
          { month: "FEB", consumption: 20 },
          { month: "MAR", consumption: 15 },
          { month: "APR", consumption: 25 },
          { month: "MAY", consumption: 22 },
          { month: "JUN", consumption: 30 },
          { month: "JUL", consumption: 28 },
          { month: "AUG", consumption: 15 },
          { month: "SEP", consumption: 25 },
          { month: "OCT", consumption: 22 },
          { month: "NOV", consumption: 30 },
          { month: "DEC", consumption: 28 },
        ];
      
        new Chart(
          document.getElementById('acquisitions'),
          {
            type: 'line',
            data: {
              labels: data.map(row => row.month),
              datasets: [
                {
                  label: 'Consumption by month',
                  data: data.map(row => row.consumption)
                }
              ]
            }
          }
        );
      })();
return(

    <>
        <div id="div1">
        
        <h1 id="h1">Smart Water Bills</h1>
        
        </div>
      
        
        <nav>
            <ul id="ul-header">
                
            <li className="li-header"><Link to="/">Home</Link></li>
            <li className="li-header"><Link to="/GetToKnowONE">Get To Know Us</Link></li>
            <li className="li-header"><Link to="/FAQs">FAQs</Link></li>
            <li className="li-header"><Link to="/ContactUs">Contact Us</Link></li>
            </ul>
        </nav>
        

        <select onChange={(event)=>setYear(event.target.value)}>
     {
       years.map((yea, index) => {
         return <option  key={`year${index}`} value={yea}>{yea}</option>
       })
     }
    </select>
    </>
)

}

export default Dashboard