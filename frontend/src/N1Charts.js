import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import './Charts.css'

const N1Charts = () => {
  const data1 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Visualization 1',
        data: [12, 19, 3, 5, 2, 3, 12],
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        fill: false,
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
      },
    ],
  };

  return (
    <div className="n1chart-container">
  <div className="chart-row">
    <Line data={data1} />
  </div>
  <div className="chart-row">
    <Line data={data2} />
  </div>
  <div className="chart-row">
    <Line data={data3} />
  </div>
</div>
  );
};

export default N1Charts;