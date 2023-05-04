/*import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Button } from 'react-bootstrap';
import './Charts.css';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000';

const V1Chart = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [globalVisible, setGlobalVisible] = useState(true);
  const [southernVisible, setSouthernVisible] = useState(true);
  const [northernVisible, setNorthernVisible] = useState(true);
  const [annualData,setAnnualData] = useState(null);
  const [showAnnnual, setShowAnnual] = useState(false);

  const toggleGlobal = () => {
    setGlobalVisible(!globalVisible);
  };
  
  const toggleSouthern = () => {
    setSouthernVisible(!southernVisible);
  };
  
  const toggleNorthern = () => {
    setNorthernVisible(!northernVisible);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:5000/api/hcmonthly');
        console.log("API response: ", response.data);
        const responseRows = response.data.rows;

        const chartData = {
          labels: responseRows.map(row => `${row.year_}-${row.month_}`),
          datasets: [
            {
              label: 'Global',
              data: responseRows.map(row => row.global_),
              borderColor: 'red',
              borderWidth: 1,
              fill: false,
              hidden: !globalVisible,
            },
            {
              label: 'Southern',
              data: responseRows.map(row => row.southern),
              borderColor: 'blue',
              borderWidth: 1,
              fill: false,
              hidden: !southernVisible,
            },
            {
              label: 'Northern',
              data: responseRows.map(row => row.northern),
              borderColor: 'green',
              borderWidth: 1,
              fill: false,
              hidden: !northernVisible,
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
  }, [globalVisible, southernVisible, northernVisible]);

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
  return (
    <div className="n1chart-container">
      <div className="chart-column">
        <Line data={data} options={options} />
        <div className="chart-controls">
          <Button onClick={toggleGlobal} variant="outline-danger">
            Toggle Global
          </Button>
          <Button onClick={toggleSouthern} variant="outline-primary">
            Toggle Southern
          </Button>
          <Button onClick={toggleNorthern} variant="outline-success">
            Toggle Northern
          </Button>
        </div>
      </div>
    </div>
  );
};
export default V1Chart;*/

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Button } from 'react-bootstrap';
import './Charts.css';
import axios from 'axios';
import Chart from 'chart.js/auto';
axios.defaults.baseURL = 'http://localhost:5000';

const V1Chart = () => {
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
        const response = await axios.get('http://localhost:5000/api/hcmonthly');
        console.log("API response: ", response.data);
        const responseRows = response.data.rows;

        const chartData = {
          labels: responseRows.map(row => `${row.year_}-${row.month_}`),
          datasets: [
            {
              label: 'Global',
              data: responseRows.map(row => row.global_),
              borderColor: 'green',
              borderWidth: 1,
              fill: false,
            },
            {
              label: 'Southern',
              data: responseRows.map(row => row.southern),
              borderColor: 'red',
              borderWidth: 1,
              fill: false,
            },
            {
              label: 'Northern',
              data: responseRows.map(row => row.northern),
              borderColor: 'blue',
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
        const response = await axios.get('http://localhost:5000/api/hcannual');
        console.log("API response annual: ", response.data);
        const responseRows = response.data.rows;

        const chartAnnualData = {
          labels: responseRows.map(row => row.year_),
          datasets: [
            {
              label: 'Global',
              data: responseRows.map(row => row.global_),
              borderColor: 'green',
              borderWidth: 1,
              fill: false,
            },
            {
              label: 'Southern',
              data: responseRows.map(row => row.southern),
              borderColor: 'red',
              borderWidth: 1,
              fill: false,
            },
            {
              label: 'Northern',
              data: responseRows.map(row => row.northern),
              borderColor: 'blue',
              borderWidth: 1,
              fill: false,
            },
            {
              label: 'Reconstruction',
              data: responseRows.map(row => row.moberg),
              borderColor: 'orange',
              borderWidth: 1,
              fill: false
            }
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
          className="annual-toggle-btn" // Apply the new CSS class
        >
          {showAnnual ? 'Show Monthly' : 'Show Annual'}
        </Button>
      </div>
      <Line data={showAnnual ? annualData : data} options={options} />
    </div>
  </div>
);
};

export default V1Chart;
            