import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import './Charts.css'

const N1Charts = () => {
  const [showLine1, setShowLine1] = useState(true);
  const [showLine2, setShowLine2] = useState(true);
  const [showLine3, setShowLine3] = useState(true);
  const [nextDatasets, setNextDatasets] = useState([]);

  const toggleLine1 = () => setShowLine1(!showLine1);
  const toggleLine2 = () => setShowLine2(!showLine2);
  const toggleLine3 = () => setShowLine3(!showLine3);

  useEffect(() => {
    // Retrieve the data from the backend API
    fetch('/api/hcmonthly')
      .then(response => response.json())
      .then(data => {
        // Convert the data into the format expected by Chart.js
        const chartData = data.map(row => ({ x: row.label, y: row.value }));
        setNextDatasets([{ label: 'Visualization 4', data: chartData, borderColor: 'rgba(255, 206, 86, 1)', borderWidth: 1, fill: false }]);
      })
      .catch(error => {
        console.error('Error retrieving data from backend API:', error);
      });
  }, []);

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
        <button className="line-toggle" onClick={toggleLine1}>
      {showLine1 ? 'Hide' : 'Show'} Visualization 1
    </button>
  </div>
  <div className="chart-column">
    <Line data={data2} />
    <button className="line-toggle" onClick={toggleLine2}>
      {showLine2 ? 'Hide' : 'Show'} Visualization 2
    </button>
  </div>
  <div className="chart-column">
    <Line data={data3} />
    <button className="line-toggle" onClick={toggleLine3}>
      {showLine3 ? 'Hide' : 'Show'} Visualization 3
    </button>
  </div>
  <div className="chart-column">
    <Line data={{ datasets: nextDatasets }} />
  </div>
</div>

);
};

export default N1Charts;


/*
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

*/