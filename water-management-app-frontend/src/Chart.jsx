import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ConsumptionChart = ({ consumptionHistory }) => {
  
  if (!consumptionHistory || consumptionHistory.length === 0) {
    return <p>No water consumption history available.</p>;
  }

  let labels = [];
  let data = [];

 
  labels = consumptionHistory.map(item => new Date(item.date).toLocaleDateString()); 
  data = consumptionHistory.map(item => item.amount);

  const dataForChart = {
    labels: labels, 
    datasets: [
      {
        label: 'Water Consumption (months)',
        data: data,
        fill: false,
        borderColor: '#15798d',
        tension: 0.1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: "black" },
      },
      x: {
        ticks: { color: "black" },
      },
    },
    plugins: {
      legend: {
        labels: { color: "black" },
      },
    },
  };

  return (
    <div className="chart-container">
      <Line data={dataForChart} options={options} />
    </div>
  );
};

export default ConsumptionChart;


