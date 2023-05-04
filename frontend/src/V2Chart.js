import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart } from 'react-chartjs-2';
import { Button } from 'react-bootstrap';
import './Charts.css';
import axios from 'axios';
import 'hammerjs';
import 'chartjs-plugin-zoom';
axios.defaults.baseURL = 'http://localhost:5000';

const V2Chart = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [annualData, setAnnualData] = useState(null);
  const [showAnnual, setShowAnnual] = useState(false);


  const toggleDataset = () => {
    setShowAnnual(!showAnnual);
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

  useEffect(() => {
    const fetchAnnualData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v2annual');
        console.log("API response annual: ", response.data);
        const responseRows = response.data.rows;

        const chartAnnualData = {
          labels: responseRows.map(row => row.year_),
          datasets: [
            {
              label: 'Mauna Loa',
              data: responseRows.map(row => row.mauna_loa),
              borderColor: 'red',
              borderWidth: 1,
              fill: false,
            },
            {
              label: 'Ice Core 1',
              data: responseRows.map(row => row.ice_core_1),
              borderColor: 'blue',
              borderWidth: 1,
              fill: false,
            },
            {
              label: 'Ice Core 2',
              data: responseRows.map(row => row.ice_core_2),
              borderColor: 'green',
              borderWidth: 1,
              fill: false,
            },
            {
              label: 'Ice Core 3',
              data: responseRows.map(row => row.ice_core_3),
              borderColor: 'purple',
              borderWidth: 1,
              fill: false,
            },
          ],
        };

        console.log("chartAnnualData: ", chartAnnualData);

        setAnnualData(chartAnnualData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAnnualData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!data || !annualData) {
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
    plugins: {
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'x',
        },
        pan: {
          enabled: true,
          mode: 'x',
        },
      },
    },
  };

  console.log("Data state:", data);
  console.log("AnnualData state:", annualData);
  console.log("ShowAnnual state:", showAnnual);

  return (
    <div className="n1chart-container">
      <div className="chart-column">
        
        <div className="annual-toggle">
          <Button
            onClick={toggleDataset}
            className="annual-toggle-btn"
          >
            {showAnnual ? 'Show Monthly' : 'Show Annual'}
          </Button>
        </div>
        <Line data={showAnnual ? annualData : data} options={options} />
        <figcaption style={{ color: 'white' }}>
  The atmospheric CO2 concentration from 0 to 800,000 years ago with Mauna Loa measurements continuing from 1958 to present. You can find the data 
    <a href="https://gml.noaa.gov/ccgg/trends/data.html" style={{color: 'white'}}> here and the description</a>
    
    <a href="https://gml.noaa.gov/ccgg/about/co2_measurements.html" style={{color: 'white'}}> here.</a>
  </figcaption>
      </div>
    </div>
  );
};

export default V2Chart;