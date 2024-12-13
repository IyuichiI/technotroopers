import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from 'chart.js/auto';

const Dashboard = (prop) => {
  let id = localStorage.getItem("id");
  console.log(id);
  if (!id) {
    id = prop.id;
  }
  const [myChart, setMyChart] = useState();
  const [year, setYear] = useState(new Date().getFullYear());
  const years = Array.from(new Array(20), (val, index) => new Date().getFullYear() - index);
  const [unpaidBills, setUnpaidBills] = useState([]);
  const [paidBills, setPaidBills] = useState([]);

  const handleLogout = () => {
    // Clear user ID or any other session storage
    localStorage.removeItem("id");
    // Redirect to login page or home
    window.location.href = "/login"; // Adjust this to your actual login route
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/consumption/${id}/${year}`)
      .then((response) => {
        var charty = document.getElementById('acquisitions');
        charty.style.visibility = "visible";
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
        ));
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, [year]); // Runs whenever the year changes

  const fetchBillingData = () => {
    axios
      .get(`http://localhost:5000/api/billing-data/${id}`)
      .then((response) => {
        if (response.data.success) {
          const unpaid = response.data.billingData.filter((bill) => bill.status === "Unpaid");
          const paid = response.data.billingData.filter((bill) => bill.status === "Paid");
          setUnpaidBills(unpaid);
          setPaidBills(paid);
        }
      })
      .catch((err) => console.error("Error fetching billing data:", err));
  };

  const handlePayBill = (billId) => {
    axios
      .post("http://localhost:5000/api/pay-bill", { billId })
      .then((response) => {
        if (response.data.success) {
          alert("Bill paid successfully!");
          fetchBillingData(); // Refresh the billing data
        }
      })
      .catch((err) => console.error("Error paying bill:", err));
  };

  useEffect(() => {
    fetchBillingData(); // Fetch billing data on mount
  }, []);


  const hardcodedUnpaidBills = [
    { id: 1, month: '2024-10', consumption: 120, amount_due: 50.0, status: 'Unpaid' },
    { id: 2, month: '2024-11', consumption: 100, amount_due: 40.0, status: 'Unpaid' },
  ];

  const hardcodedPaidBills = [
    { id: 3, month: '2024-08', consumption: 150, amount_due: 0.0, status: 'Paid' },
    { id: 4, month: '2024-09', consumption: 110, amount_due: 0.0, status: 'Paid' },
  ];

  return (
    <div>
      <div style={{ margin: "auto", width: "100%" }} className="dashboard-container">
        <div className="header">
          <div>
            <h1 className="header-title">Welcome!</h1>
            <p className="proverb">"Water is life. Manage it wisely!"</p>
          </div>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>

        <div className="main-content">
          <section>
            <h3 id="BillingHistory">Billing History</h3>
            <div>
              <h4>Unpaid Bills</h4>
              <table border="1">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Month</th>
                    <th>Consumption (m³)</th>
                    <th>Amount Due ($)</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {hardcodedUnpaidBills.map((bill) => (
                    <tr key={bill.id}>
                      <td>{bill.id}</td>
                      <td>{bill.month}</td>
                      <td>{bill.consumption}</td>
                      <td>{bill.amount_due.toFixed(2)}</td>
                      <td>{bill.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <h4>Paid Bills</h4>
              <table border="1">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Month</th>
                    <th>Consumption (m³)</th>
                    <th>Amount Due ($)</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {hardcodedPaidBills.map((bill) => (
                    <tr key={bill.id}>
                      <td>{bill.id}</td>
                      <td>{bill.month}</td>
                      <td>{bill.consumption}</td>
                      <td>{bill.amount_due.toFixed(2)}</td>
                      <td>{bill.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>

      <div style={{ margin: "auto", width: "100%" }} className="consumptionDiv">
        <h2 id="BillingHistory">Consumption Data</h2>
        <select onChange={(event) => { myChart.destroy(); setYear(event.target.value); }}>
          {
            years.map((yea, index) => {
              return <option key={`year${index}`} value={yea}>{yea}</option>;
            })
          }
        </select>
      </div>
    </div>
  );
};

export default Dashboard;
