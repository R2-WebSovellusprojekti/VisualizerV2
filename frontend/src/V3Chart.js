import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import './Charts.css';
axios.defaults.baseURL = 'http://localhost:5000';

const V3Chart = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:5000/api/v3');
        console.log("API response: ", response.data);
        const responseRows = response.data.rows;

        const chartData = {
          labels: responseRows.map(row => row.kyr),
          datasets: [
            {
              label: 'Temperature',
              data: responseRows.map(row => row.temp),
              borderColor: 'red',
              borderWidth: 1,
              fill: false,
              yAxisID: 'y-temp',
            },
            {
              label: 'CO2',
              data: responseRows.map(row => row.co2),
              borderColor: 'blue',
              borderWidth: 1,
              fill: false,
              yAxisID: 'y-co2',
            },
          ],
        };

        console.log("chartData: ", chartData);

        setData(chartData);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return null;
  }

  const options = {
    layout: {
      padding: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
      },
    },
    scales: {
      y: {
        temp: {
          type: 'linear',
          position: 'right',
          title: {
            display: true,
            text: 'Surface Temperature Change',
          },
        },
        co2: {
          type: 'linear',
          position: 'left',
          title: {
            display: true,
            text: 'CO2 ppm',
          },
        },
      },
    },
  };

  console.log("Data state:", data);

  return (
    <div className="n3chart-container">
      <div className="chart-column">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default V3Chart;