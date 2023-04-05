import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import './Charts.css'

const N2Charts = () => {
  const data1 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Visualization 4',
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
        label: 'Visualization 5',
        data: [5, 6, 7, 8, 9, 10, 11],
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        fill: false,
      },
    ],
  };
  return (
    <div className="n2chart-container">
  <div className="chart-column">
    <Line data={data1} />
  </div>
  <div className="chart-column">
    <Line data={data2} />
  </div>
</div>
  );
};

export default N2Charts;