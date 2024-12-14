{ /*import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "chart.js/auto";

const Dashboard = (prop) => {
  let id = localStorage.getItem("id");
  if (!id) {
    id = prop.id;
  }
  const [myChart, setMyChart] = useState(null); // Ensure a single chart instance
  const [year, setYear] = useState(new Date().getFullYear());
  const years = Array.from(new Array(20), (val, index) => new Date().getFullYear() - index);
  const [bills, setBills] = useState([]); // Store all bills

  const handleLogout = () => {
    localStorage.removeItem("id");
    window.location.href = "/login";
  };

  const fetchConsumptionData = () => {
    axios
      .get(`http://localhost:5000/api/consumption/${id}/${year}`)
      .then((response) => {
        const charty = document.getElementById("acquisitions");
        if (charty && myChart) {
          myChart.destroy(); // Destroy the existing chart before creating a new one
        }
        setMyChart(
          new Chart(charty, {
            type: "line",
            data: {
              labels: response.data.map((row) => new Date(row.month).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })),
              datasets: [
                {
                  label: "Consumption by month",
                  data: response.data.map((row) => row.total_consumption),
                  borderColor: "#42A5F5",
                  fill: false,
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
            },
          })
        );
      })
      .catch((error) => {
        console.error("Error fetching consumption data:", error);
      });
  };

  const fetchBillingData = () => {
    axios
      .get(`http://localhost:5000/api/billing-data/${id}`)
      .then((response) => {
        console.log("Billing Data:", response.data); // Debugging
        if (response.data.success) {
          setBills(response.data.billingData);
        }
      })
      .catch((err) => console.error("Error fetching billing data:", err));
  };

  useEffect(() => {
    fetchBillingData();
    fetchConsumptionData();
  }, [year]); // Fetch billing and consumption data when the year changes

  return (
    <div>
      <div className="dashboard-container">
        <div className="header">
          <div>
            <h1 className="header-title">Welcome!</h1>
            <p className="proverb">"Water is life. Manage it wisely!"</p>
          </div>
          <div className ="sidebar">
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
          </div>
        </div>

        <div className="main-content">
          <section className="billing-history">
            <h2 id="BillingHistory">Billing History</h2>
            <div>
              <h4>All Bills</h4>
              {bills.length > 0 ? (
                <table border="1">
                  <thead>
                    <tr>
                      <th>Month</th>
                      <th>Consumption (m³)</th>
                      <th>Amount Due ($)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bills.map((bill, index) => (
                      <tr key={index}>
                        <td>{new Date(bill.month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</td>
                        <td>{bill.consumption}</td>
                        <td>{bill.amount_due}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No bills available.</p>
              )}
            </div>
          </section>
        
      </div>

      <section className="charts">
        
        <h3 id="BillingHistory">Consumption Data</h3>
        <select
          onChange={(event) => {
            setYear(event.target.value);
          }}
          value={year}
        >
          {years.map((yea, index) => (
            <option key={`year${index}`} value={yea}>
              {yea}
            </option>
          ))}
        </select>
        <canvas id="acquisitions" style={{ maxHeight: "400px", marginTop: "20px" }}></canvas>
      
    </section>
    </div>
    </div>
  );
};

export default Dashboard; */}


// Updated Dashboard.jsx
import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Chart from "chart.js/auto";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
const Dashboard = (prop) => {
  let id = localStorage.getItem("id");
  if (!id) {
    id = prop.id;
  }
  const navigate = useNavigate();

  const [myChart, setMyChart] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const years = Array.from(new Array(20), (val, index) => new Date().getFullYear() - index);
  const [bills, setBills] = useState([]);
  const [change, setChange] = useState(0);
  const [dueBills, setDueBills] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentDueIndex, setCurrentDueIndex] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem("id");
    window.location.href = "/login";
  };

  const fetchConsumptionData = () => {
    axios
      .get(`http://localhost:5000/api/consumption/${id}/${year}`)
      .then((response) => {
        const charty = document.getElementById("acquisitions");
        if (charty && myChart) {
          myChart.destroy();
        }
        setMyChart(
          new Chart(charty, {
            type: "line",
            data: {
              labels: response.data.map((row) => new Date(row.month).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })),
              datasets: [
                {
                  label: "Consumption by month",
                  data: response.data.map((row) => row.total_consumption),
                  borderColor: "#42A5F5",
                  fill: false,
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
            },
          })
        );
      })
      .catch((error) => {
        console.error("Error fetching consumption data:", error);
      });
  };

  const fetchBillingData = () => {
    axios
      .get(`http://localhost:5000/api/billing-data/${id}`)
      .then((response) => {
        if (response.data.success) {
          setBills(response.data.billingData);
        }
      })
      .catch((err) => console.error("Error fetching billing data:", err));
  };

  const fetchDueBills = () => {
    axios
      .get(`http://localhost:5000/api/due-bills/${id}`)
      .then((response) => {
        if (response.data.success) {
          // console.log(response.data.unpaidBills)
          setDueBills(response.data.unpaidBills);
        }
      })
      .catch((err) => console.error("Error fetching billing data:", err));
  };

  useEffect(() => {
    fetchConsumptionData();
  }, [year,change]);
  useEffect(()=>{
    fetchBillingData();
    fetchDueBills();
  },[year,change])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % bills.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + bills.length) % bills.length);
  };

  const nextDueSlide = () => {
    setCurrentDueIndex((prevDueIndex) => (prevDueIndex + 1) % dueBills.length);
  };

  const prevDueSlide = () => {
    setCurrentDueIndex((prevDueIndex) => (prevDueIndex - 1 + dueBills.length) % bills.length);
  };
  const PayedBill=(billId)=>{
    console.log("got here")
    axios
      .post(`http://localhost:5000/api/pay-bill`,{billId})
      .then((response) => {
        if (response.data.success) {
          setChange(change+1);
        }
      })
      .catch((err) => console.error("Error fetching billing data:", err));

  }

  return (
    <div className="dashboard-container">
      <div className="header">
        <div>
          <h1 className="header-title">Welcome!</h1>
          <p className="proverb">"Water is life. Manage it wisely!"</p>
        </div>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>

      <div className="main-content" >
        <div className="charts-container" style={{width:"100dvw",display:"flex",flexWrap:"wrap",justifyContent:"space-evenly"}}>
          <div className="slider-section" style={{flexGrow:"0",flexShrink:"0",flexBasis:"calc(20% - 20px)",height:"70%"}}>
            <h2>Billing History</h2>
            {bills.length > 0 ? (
              <div className="slider">
                <button className="prev" onClick={prevSlide}>&#8249;</button>
                <div className="bill-box">
                  <h4>{new Date(bills[currentIndex].month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h4>
                  <p>Consumption: {bills[currentIndex].consumption} m³</p>
                  <p>Amount Due: ${bills[currentIndex].amount_due}</p>
                </div>
                <button className="next" onClick={nextSlide}>&#8250;</button>
              </div>
            ) : (
              <p>No bills available.</p>
            )}
          </div>
          <div className="charts" style={{flexGrow:"0",flexShrink:"0",flexBasis:"calc(40% - 20px)"}}>
            <h3>Consumption Data</h3>
            <select
              onChange={(event) => setYear(event.target.value)}
              value={year}
            >
              {years.map((yea, index) => (
                <option key={`year${index}`} value={yea}>{yea}</option>
              ))}
            </select>
            <canvas id="acquisitions"></canvas>
          </div>
          <div className="slider-section" id="unpaidCart" style={{flexGrow:"0",flexShrink:"0",flexBasis:"calc(20% - 20px)",height:"70%"}}>
            <h2>Due Bills</h2>
            {dueBills.length > 0 ? (
              <div className="slider" >
                <button className="prev" onClick={prevDueSlide}>&#8249;</button>
                <div className="bill-box">
                  <h4>{new Date(dueBills[currentDueIndex].month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h4>
                  <p>Consumption: {dueBills[currentDueIndex].consumption} m³</p>
                  <p>Amount Due: ${dueBills[currentDueIndex].amount_due}</p>
              <span>
                  <PayPalScriptProvider   options={{ clientId: "test" }}>
            <PayPalButtons onClick={()=>{setChange(change+1);PayedBill(dueBills[currentDueIndex].id);nextDueSlide()}}  style={{ layout: "horizontal" }} />
         </PayPalScriptProvider>
        </span>
                </div>
                <button className="next" onClick={nextDueSlide}>&#8250;</button>
              </div>
            ) : (
              <p>Everything is paid and up to date</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


