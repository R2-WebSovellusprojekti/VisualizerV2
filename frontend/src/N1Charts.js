//import React, { useState } from 'react';
//import { Line } from 'react-chartjs-2';
//import { Chart as ChartJS } from 'chart.js/auto';
//import './Charts.css'


import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import './Charts.css';
import axios from 'axios';
/*const N1Charts = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        /*const response = await fetch('/api/hcmonthly');
        const data = await response.json();
        console.log(data);
        if (!data) {
          return null;
        }
        const fetchData = async () => {
          try {
            const response = await axios.get('/api/hcmonthly');
            const data = response.data;
            console.log(data);
            // process the data as needed
          } catch (error) {
            console.error(error);
          }
        };
        setChartData({
          labels: data.labels, //data.labels,
          datasets: [
            {
              label: 'Global',
              data: data.datasets[0]?.data ?? [],
              borderColor: 'red',
              borderWidth: 1,
              fill: false,
            },
            {
              label: 'Southern',
              data: data.datasets[1]?.data ?? [],
              borderColor: 'blue',
              borderWidth: 1,
              fill: false,
            },
            {
              label: 'Northern',
              data: data.datasets[2]?.data ?? [],
              borderColor: 'green',
              borderWidth: 1,
              fill: false,
            },
          ],
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="n1chart-container">
      <div className="chart-column">
        <Line data={chartData} />
      </div>
    </div>
  );
};*/
//tämä on vanha jos tarvii
/*const N1Charts = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/hcmonthly');
      const data = await response.json();
      console.log(data);
      setChartData({
        labels: data.map(row => row.label),
        datasets: [
          {
            label: 'Visualization 1',
            data: data.map(row => row.value),
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            fill: false,
          },
        ],
      });
      console.log(data);
    };
    fetchData();
  }, []);

  return (
    <div className="n1chart-container">
      <div className="chart-column">
        <Line data={chartData} />
      </div>
    </div>
  );
};*/

/*const N1Charts = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('fetchData');  add this line
        const response = await axios.get('http://localhost:5000/api/hcmonthly');
        console.log(response.data);
        const chartData = {
          labels: response.data.labels,
          datasets: [
            {
              label: 'Global',
              data: response.data.datasets[0].data,
              borderColor: 'red',
              borderWidth: 1,
              fill: false,
            },
            {
              label: 'Southern',
              data: response.data.datasets[1].data,
              borderColor: 'blue',
              borderWidth: 1,
              fill: false,
            },
            {
              label: 'Northern',
              data: response.data.datasets[2].data,
              borderColor: 'green',
              borderWidth: 1,
              fill: false,
            },
          ],
        };
        console.log(chartData); 
        setData(chartData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="n1chart-container">
      <div className="chart-column">
        <Line data={data} />
      </div>
    </div>
  );
};*/
/*const N1Charts = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/hcmonthly');
        console.log(response.data);
        const formattedData = response.data.map(monthData => ({
          x: new Date(monthData.year_, monthData.month_ - 1),
          y: {
            global: monthData.global_,
            northern: monthData.northern,
            southern: monthData.southern
          }
        }));
        const chartData = {
          datasets: [
            {
              label: 'Global',
              data: formattedData.map(monthData => ({ x: monthData.x, y: monthData.y.global })),
              borderColor: 'red',
              borderWidth: 1,
              fill: false,
            },
            {
              label: 'Southern',
              data: formattedData.map(monthData => ({ x: monthData.x, y: monthData.y.southern })),
              borderColor: 'blue',
              borderWidth: 1,
              fill: false,
            },
            {
              label: 'Northern',
              data: formattedData.map(monthData => ({ x: monthData.x, y: monthData.y.northern })),
              borderColor: 'green',
              borderWidth: 1,
              fill: false,
            },
          ],
        };
        setData(chartData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="n1chart-container">
      <div className="chart-column">
        <Line data={data} />
      </div>
    </div>
  );
};

export default N1Charts;*/

/*const N1Charts = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/hcmonthly');

        let chartData = {};
        if (Array.isArray(response.data)) {
          chartData = {
            labels: response.data.map(item => `${item.year_}-${item.month_}`),
            datasets: [
              {
                label: 'Global',
                data: response.data.map(item => item.global_),
                borderColor: 'red',
                borderWidth: 1,
                fill: false,
              },
              {
                label: 'Southern',
                data: response.data.map(item => item.southern),
                borderColor: 'blue',
                borderWidth: 1,
                fill: false,
              },
              {
                label: 'Northern',
                data: response.data.map(item => item.northern),
                borderColor: 'green',
                borderWidth: 1,
                fill: false,
              },
            ],
          };
        }

        setData(chartData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="n1chart-container">
      <div className="chart-column">
        <Line data={data} />
      </div>
    </div>
  );
};

export default N1Charts;*/
/*const N1Charts = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/hcmonthly');
        console.log(response.data);

        if (response.data) {
          const formattedData = response.data.map(monthData => ({
            x: new Date(monthData.year_, monthData.month_ - 1),
            y: {
              global: monthData.global_,
              northern: monthData.northern,
              southern: monthData.southern
            }
          }));
          console.log(formattedData);
          const chartData = {
            datasets: [
              {
                label: 'Global',
                data: formattedData.map(monthData => ({ x: monthData.x, y: monthData.y.global })),
                borderColor: 'red',
                borderWidth: 1,
                fill: false,
              },
              {
                label: 'Southern',
                data: formattedData.map(monthData => ({ x: monthData.x, y: monthData.y.southern })),
                borderColor: 'blue',
                borderWidth: 1,
                fill: false,
              },
              {
                label: 'Northern',
                data: formattedData.map(monthData => ({ x: monthData.x, y: monthData.y.northern })),
                borderColor: 'green',
                borderWidth: 1,
                fill: false,
              },
            ],
          };
          setData(chartData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="n1chart-container">
      <div className="chart-column">
        <Line data={data} />
      </div>
    </div>
  );
};*/

//export default N1Charts;
/*const N1Charts = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/hcmonthly');
        console.log(response.data);

if (response.data && response.data.length > 0) {
  const formattedData = response.data.map(monthData => ({
    x: new Date(monthData.year_, monthData.month_ - 1),
    y: {
      global: monthData.global_,
      northern: monthData.northern,
      southern: monthData.southern
    }
  }));
  console.log(formattedData);
  const chartData = {
    datasets: [
      {
        label: 'Global',
        data: formattedData.map(monthData => ({ x: monthData.x, y: monthData.y.global })),
        borderColor: 'red',
        borderWidth: 1,
        fill: false,
      },
      {
        label: 'Southern',
        data: formattedData.map(monthData => ({ x: monthData.x, y: monthData.y.southern })),
        borderColor: 'blue',
        borderWidth: 1,
        fill: false,
      },
      {
        label: 'Northern',
        data: formattedData.map(monthData => ({ x: monthData.x, y: monthData.y.northern })),
        borderColor: 'green',
        borderWidth: 1,
        fill: false,
      },
    ],
  };
  setData(chartData);
} else {
  console.log("response.data is null or has zero length");
}
export default N1Charts;*/
/*const N1Charts = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/hcmonthly');
        let chartData = {};
        if (Array.isArray(response.data)) {
          chartData = {
            labels: response.data.map(item => `${item.year_}-${item.month_}`),
            datasets: [
              {
                label: 'Global',
                data: response.data.map(item => item.global_),
                borderColor: 'red',
                borderWidth: 1,
                fill: false,
              },
              {
                label: 'Southern',
                data: response.data.map(item => item.southern),
                borderColor: 'blue',
                borderWidth: 1,
                fill: false,
              },
              {
                label: 'Northern',
                data: response.data.map(item => item.northern),
                borderColor: 'green',
                borderWidth: 1,
                fill: false,
              },
            ],
          };
        }

        setData(chartData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="n1chart-container">
      <div className="chart-column">
        <Line data={data} />
      </div>
    </div>
  );
};

export default N1Charts;*/
const N1Charts = () => {
  const [data, setData] = useState({});

  /*useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/hcmonthly');
        console.log(response.data);
        console.log(typeof response.data);

        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          const formattedData = response.data.map(monthData => ({
            
            x: new Date(monthData.year_, monthData.month_ - 1),
            y: {
              global: monthData.global_,
              northern: monthData.northern_,
              southern: monthData.southern_
            }
          }));
          if (formattedData.length > 0) {
            console.log(`formattedData: ${formattedData}`);
            // Smooth out the data
            const smoothedData = smoothData(formattedData, 3); 

            const chartData = {
              datasets: [
                {
                  label: 'Global',
                  data: smoothedData.map(monthData => ({ x: monthData.x, y: monthData.y.global })),
                  borderColor: 'red',
                  borderWidth: 1,
                  fill: false,
                },
                {
                  label: 'Southern',
                  data: smoothedData.map(monthData => ({ x: monthData.x, y: monthData.y.southern })),
                  borderColor: 'blue',
                  borderWidth: 1,
                  fill: false,
                },
                {
                  label: 'Northern',
                  data: smoothedData.map(monthData => ({ x: monthData.x, y: monthData.y.northern })),
                  borderColor: 'green',
                  borderWidth: 1,
                  fill: false,
                },
              ],
            };
            setData(chartData);
          } else {
            console.log("formattedData is null or has zero length");
          }
        } else {
          console.log("response.data is null or has zero length");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);*/

  /*useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/hcmonthly');
  
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          const formattedData = response.data.map(monthData => {
            console.log(monthData);
            return {
              x: new Date(monthData.year_, monthData.month_ - 1),
              y: {
                global: monthData.global_,
                northern: monthData.northern_,
                southern: monthData.southern_
              }
            };
          });
  
          if (formattedData.length > 0) {
            const smoothedData = smoothData(formattedData, 3); 
  
            const chartData = {
              datasets: [
                {
                  label: 'Global',
                  data: smoothedData.map(monthData => ({ x: monthData.x, y: monthData.y.global })),
                  borderColor: 'red',
                  borderWidth: 1,
                  fill: false,
                },
                {
                  label: 'Southern',
                  data: smoothedData.map(monthData => ({ x: monthData.x, y: monthData.y.southern })),
                  borderColor: 'blue',
                  borderWidth: 1,
                  fill: false,
                },
                {
                  label: 'Northern',
                  data: smoothedData.map(monthData => ({ x: monthData.x, y: monthData.y.northern })),
                  borderColor: 'green',
                  borderWidth: 1,
                  fill: false,
                },
              ],
            };
            setData(chartData);
          } else {
            console.log("formattedData is null or has zero length");
          }
        } else {
          console.log("response.data is null or has zero length");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="n1chart-container">
      <div className="chart-column">
        <Line data={data} />
      </div>
    </div>
  );
};*/
          /*const formattedData = response.data.map(monthData => ({
            x: new Date(monthData.year_, monthData.month_ - 1),
            y: {
              global: monthData.global_,
              northern: monthData.northern,
              southern: monthData.southern
            }
          }));
          //console.log(formattedData);
          console.log(`formattedData: `, formattedData);
          // Smooth out the data
          const smoothedData = smoothData(formattedData, 3); 

          const chartData = {
            datasets: [
              {
                label: 'Global',
                data: smoothedData.map(monthData => ({ x: monthData.x, y: monthData.y.global })),
                borderColor: 'red',
                borderWidth: 1,
                fill: false,
              },
              {
                label: 'Southern',
                data: smoothedData.map(monthData => ({ x: monthData.x, y: monthData.y.southern })),
                borderColor: 'blue',
                borderWidth: 1,
                fill: false,
              },
              {
                label: 'Northern',
                data: smoothedData.map(monthData => ({ x: monthData.x, y: monthData.y.northern })),
                borderColor: 'green',
                borderWidth: 1,
                fill: false,
              },
            ],
          };
          setData(chartData);
        } else {
          console.log("response.data is null or has zero length");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="n1chart-container">
      <div className="chart-column">
        <Line data={data} />
      </div>
    </div>
  );
};*/

function smoothData(data, smoothingFactor) {
  // Perform smoothing
  const smoothedData = [];
  for (let i = 0; i < data.length; i++) {
    const smoothedPoint = {
      x: data[i].x,
      y: {
        global: 0,
        northern: 0,
        southern: 0,
      },
    };

    for (let j = i - smoothingFactor; j <= i + smoothingFactor; j++) {
      if (j < 0 || j >= data.length) {
        continue;
      }
      smoothedPoint.y.global += data[j].y.global;
      smoothedPoint.y.northern += data[j].y.northern;
      smoothedPoint.y.southern += data[j].y.southern;
    }
    smoothedPoint.y.global /= (2 * smoothingFactor + 1);
    smoothedPoint.y.northern /= (2 * smoothingFactor + 1);
    smoothedPoint.y.southern /= (2 * smoothingFactor + 1);
    smoothedData.push(smoothedPoint);
  }
  console.log(smoothedData)
  return smoothedData;
}
export default N1Charts;
/*const N1Charts = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/hcmonthly');

        let chartData = {};
        if (Array.isArray(response.data)) {
          chartData = {
            labels: response.data.map(item => `${item.year_}-${item.month_}`),
            datasets: [
              {
                label: 'Global',
                data: response.data.map(item => item.global_),
                borderColor: 'red',
                borderWidth: 1,
                fill: false,
              },
              {
                label: 'Southern',
                data: response.data.map(item => item.southern),
                borderColor: 'blue',
                borderWidth: 1,
                fill: false,
              },
              {
                label: 'Northern',
                data: response.data.map(item => item.northern),
                borderColor: 'green',
                borderWidth: 1,
                fill: false,
              },
            ],
          };
        }

        setData(chartData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="n1chart-container">
      <div className="chart-column">
        {Array.isArray(data.datasets) && <Line data={data} />}
      </div>
    </div>
  );
};

export default N1Charts;*/
/*const N1Charts = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/hcmonthly');

        let chartData = {};
        if (Array.isArray(response.data)) {
          chartData = {
            labels: response.data.map(item => `${item.year_}-${item.month_}`),
            datasets: [
              {
                label: 'Global',
                data: response.data.map(item => item.global_),
                borderColor: 'red',
                borderWidth: 1,
                fill: false,
              },
              {
                label: 'Southern',
                data: response.data.map(item => item.southern),
                borderColor: 'blue',
                borderWidth: 1,
                fill: false,
              },
              {
                label: 'Northern',
                data: response.data.map(item => item.northern),
                borderColor: 'green',
                borderWidth: 1,
                fill: false,
              },
            ],
          };
        }

        setData(chartData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  try {
    return (
      <div className="n1chart-container">
        <div className="chart-column">
          <Line data={data} />
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default N1Charts;*/
/*const N1Charts = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/hcmonthly');

        let chartData = {};
        if (Array.isArray(response.data)) {
          chartData = {
            labels: response.data.map(item => `${item.year_}-${item.month_}`),
            datasets: [
              {
                label: 'Global',
                data: response.data.map(item => item.global_),
                borderColor: 'red',
                borderWidth: 1,
                fill: false,
              },
              {
                label: 'Southern',
                data: response.data.map(item => item.southern),
                borderColor: 'blue',
                borderWidth: 1,
                fill: false,
              },
              {
                label: 'Northern',
                data: response.data.map(item => item.northern),
                borderColor: 'green',
                borderWidth: 1,
                fill: false,
              },
            ],
          };
        }

        setData(chartData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  try {
    return (
      <div className="n1chart-container">
        <div className="chart-column">
          <Line
            data={{
              labels: data.labels || [],
              datasets: data.datasets || [],
            }}
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default N1Charts;*/
/*const N1Charts = () => {
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

export default N1Charts;*/