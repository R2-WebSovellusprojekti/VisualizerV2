import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-annotation';

const CreateChart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'EI',
        data: [{ x: 'February', y: 70 }],
        pointRadius: 5,
        pointHoverRadius: 5,
        backgroundColor: 'rgb(75, 192, 192)',
      },
      {
        label: 'TOIMI',
        data: [{ x: 'May', y: 70 }],
        pointRadius: 5,
        pointHoverRadius: 5,
        backgroundColor: 'rgb(75, 192, 192)',
      },
      {
        label: ':D',
        data: [
          { x: 'January', y: 50 },
          { x: 'February', y: 60 },
          { x: 'March', y: 50 },
          { x: 'April', y: 40 },
          { x: 'May', y: 50 },
          { x: 'June', y: 40 },
          { x: 'July', y: 50 },
        ],
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 2,
        fill: false,
        tension: 0,
      },
    ],
  };
  const options = {
    scales: {
      y: {
        min: 0,
        max: 100,
      },
    },
    plugins: {
      annotation: {
        annotations: {
          smile: {
            type: 'ellipse',
            xScaleID: 'x',
            yScaleID: 'y',
            xMin: 'January',
            xMax: 'July',
            yMin: 40,
            yMax: 60,
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 2,
          },
        },
      },
    },
  };

  return (
    <div className="create-chart-container">
      <Line data={data} options={options} className='create-chart-canvas' />
    </div>
  );
};

export default CreateChart;