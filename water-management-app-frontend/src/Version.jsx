import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ConsumptionChart from './Chart'; 
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user'))); 
  const [billingHistory, setBillingHistory] = useState([]);
  const [consumptionHistory, setConsumptionHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [unpaidBills, setUnpaidBills] = useState([]);
  const [paidBills, setPaidBills] = useState([]);

 
  useEffect(() => {
    if (user && user.email) {
      // Fetch Billing History
      axios.get(`http://localhost:8081/billing-history/${user.email}`)
        .then((response) => {
          if (response.data.success) {
            const unpaid = response.data.billingHistory.filter(bill => bill.status === "Unpaid");
            const paid = response.data.billingHistory.filter(bill => bill.status === "Paid");
  
            setUnpaidBills(unpaid);
            setPaidBills(paid);
          } else {
            setError('No billing history available.');
          }
        })
        .catch((err) => {
          console.error('Error fetching billing history:', err);
          setError('There was an error fetching your billing history.');
        });
  
      // Fetch Water Consumption History
      axios.get(`http://localhost:8081/consumption-history/${user.email}`)
        .then((response) => {
          if (response.data.success) {
            setConsumptionHistory(response.data.consumptionHistory);
          } else {
            setError('No water consumption history available.');
          }
        })
        .catch((err) => {
          console.error('Error fetching consumption history:', err);
          setError('There was an error fetching your consumption history.');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
      setError('User not logged in.');
    }
  }, [user]);
  
  const [unpaidIndex, setUnpaidIndex] = useState(0); // Track the index for unpaid bills
  const [paidIndex, setPaidIndex] = useState(0); // Track the index for paid bills
  
  const nextUnpaid = () => {
    setUnpaidIndex((prevIndex) => (prevIndex + 1) % unpaidBills.length);
  };
  
  const prevUnpaid = () => {
    setUnpaidIndex((prevIndex) => (prevIndex - 1 + unpaidBills.length) % unpaidBills.length);
  };
  
  const nextPaid = () => {
    setPaidIndex((prevIndex) => (prevIndex + 1) % paidBills.length);
  };
  
  const prevPaid = () => {
    setPaidIndex((prevIndex) => (prevIndex - 1 + paidBills.length) % paidBills.length);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };
  
  if (!user) {
    return <p>User not logged in</p>;
  }
  
  return (
    <div className="dashboard-container">
      <div className="header">
        <div>
          <h1 className="header-title">Welcome {user.name}!</h1>
          <p className="proverb">"Water is life. Manage it wisely!"</p>
        </div>
        <div className="sidebar">
          <Link to="/"> <button className="logout-button" onClick={handleLogout}>Logout</button> </Link>
        </div>
      </div>
  
      <div className="main-content">
        <section className="billing-history">
          <h2 id="BillingHistory">Billing History</h2>
          <div className="slider-container">
            {/* Unpaid Bills Slider */}
            <div className="slider-section">
  <h3 id="UnpaidBills">Unpaid Bills</h3>
  <button className="prev" onClick={prevUnpaid}>&#10094;</button>
  {unpaidBills.length > 0 ? (
    <div className="slider-item">
      <p><strong>Date:</strong> {new Date(unpaidBills[unpaidIndex].date).toLocaleDateString()}</p>
      <p><strong>Amount:</strong> {unpaidBills[unpaidIndex].amount} MAD</p>
      
     <Link to="/Payment"><button className="pay-now-button">Pay Now</button></Link> 
    </div>
  ) : (
    <p>No unpaid bills available.</p>
  )}
  <button className="next" onClick={nextUnpaid}>&#10095;</button>
</div>
  
<div className="slider-section">
  <h3>Paid Bills</h3>
  <button className="prev" onClick={prevPaid}>&#10094;</button>
  {paidBills.length > 0 ? (
    <div className="slider-item">
      <p><strong>Date:</strong> {new Date(paidBills[paidIndex].date).toLocaleDateString()}</p>
      <p><strong>Amount:</strong> {paidBills[paidIndex].amount} MAD</p>
     
    </div>
  ) : (
    <p>No paid bills available.</p>
  )}
  <button className="next" onClick={nextPaid}>&#10095;</button>
</div>
          </div>
        </section>
  
        {/* Water Consumption Section */}
        <section className="charts">
          <h3>Water Consumption History</h3>
          <ConsumptionChart consumptionHistory={consumptionHistory} />
        </section>
      </div>
    </div>
  );
  };
  
  export default Dashboard;