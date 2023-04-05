import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import './Charts.css'

const N1Charts = () => {
  const [showLine1, setShowLine1] = useState(true);
  const [showLine2, setShowLine2] = useState(true);
  const [showLine3, setShowLine3] = useState(true);

  const toggleLine1 = () => setShowLine1(!showLine1);
  const toggleLine2 = () => setShowLine2(!showLine2);
  const toggleLine3 = () => setShowLine3(!showLine3);

  const data1 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Visualization 1',
        data: [12, 19, 3, 5, 2, 3, 12],
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        fill: false,
        hidden: !showLine1, // toggle visibility based on state
      },
    ],
  };

  const data2 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Visualization 2',
        data: [5, 6, 7, 8, 9, 10, 11],
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        fill: false,
        hidden: !showLine2, // toggle visibility based on state
      },
    ],
  };

  const data3 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Visualization 3',
        data: [8, 5, 2, 6, 12, 15, 10],
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        fill: false,
        hidden: !showLine3, // toggle visibility based on state
      },
    ],
  };

  return (
    <div className="n1chart-container">
      <div className="chart-column">
        <Line data={data1} />
        <button className="line-button" onClick={toggleLine1}>
          {showLine1 ? 'Hide line' : 'Show line'}
        </button>
      </div>
      <div className="chart-column">
        <Line data={data2} />
        <button className="line-button" onClick={toggleLine2}>
          {showLine2 ? 'Hide line' : 'Show line'}
        </button>
      </div>
      <div className="chart-column">
        <Line data={data3} />
        <button className="line-button" onClick={toggleLine3}>
          {showLine3 ? 'Hide line' : 'Show line'}
        </button>
      </div>
    </div>
  );
};

export default N1Charts;