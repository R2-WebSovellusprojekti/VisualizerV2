import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Button } from 'react-bootstrap';
import './Charts.css';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000';

const V2Chart = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lineVisible, setLineVisible] = useState(true);

    const toggleLine = () => {
    setLineVisible(!lineVisible);
    };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:5000/api/v2monthly');
        console.log("API response: ", response.data);
        const responseRows = response.data.rows;

        const chartData = {
          labels: responseRows.map(row => `${row.year_}-${row.month_}`),
          datasets: [
            {
              label: 'CO2 Level',
              data: responseRows.map(row => row.avg_co2),
              borderColor: 'red',
              borderWidth: 1,
              fill: false,
                hidden: !lineVisible,
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
  }, [lineVisible]);

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
  };

  console.log("Data state:", data);

  return (
    <div className="n1chart-container">
      <div className="chart-column">
      <figure>
  <Line data={data} options={options} />
  <figcaption style={{ color: 'white' }}>
    Atmospheric CO2 concentrations from Mauna Loa measurements starting 1958.
    <br />
  
    <a href="https://gml.noaa.gov/ccgg/trends/data.html" style={{color: 'white'}}> Data source</a>
    <br />
    <a href="https://gml.noaa.gov/ccgg/about/co2_measurements.html" style={{color: 'white'}}> Description</a>
  </figcaption>
</figure>
        <div className="chart-controls">
        <Button onClick={toggleLine} variant="outline-primary"> {/* Add Hide Line button */}
          {lineVisible ? 'Hide Line' : 'Show Line'}
        </Button>
        </div>
      </div>
    </div>
  );
};

export default V2Chart;