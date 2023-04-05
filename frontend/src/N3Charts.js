import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import './Charts.css'

const N3Charts = () => {
  const data1 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Custom Chart',
        data: [19,-19 , 19, -19, 19, -19, 19],
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        fill: false,
      },
    ],
  };

  return (
    <div className="n3chart-container">
  <div className="chart-row">
    <Line data={data1} />
  </div>
</div>
  );
};

export default N3Charts;