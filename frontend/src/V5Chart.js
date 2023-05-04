import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';

const V5Chart = () => {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [activeSector, setActiveSector] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v5');
        setData(response.data.rows);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const sectorData = data
      .filter((item) => !activeSector || item.sector === activeSector)
      .reduce((acc, item) => {
        const key = activeSector ? item.sub_sector : item.sector;
        const value = item.share;

        if (acc.labels.includes(key)) {
          const index = acc.labels.indexOf(key);
          acc.datasets[0].data[index] += value;
        } else {
          acc.labels.push(key);
          acc.datasets[0].data.push(value);
        }

        return acc;
      }, {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40',
                '#E7E9ED',
                '#8ACF82',
                '#FF7F50',
                '#87CEFA',
            ],
          },
        ],
      });

    setChartData(sectorData);
  }, [data, activeSector]);

  const handleClick = (elements, chart) => {
    if (!elements.length) return;

    const index = elements[0].index;
    const label = chartData.labels[index];

    setActiveSector(activeSector ? null : label);
  };

  if (!chartData) {
    return null;
  }

  return (
    <div>
      <Doughnut
        data={chartData}
        onElementsClick={handleClick}
        options={{
          plugins: {
            tooltip: {
              enabled: false
            }
          },
          onClick: handleClick,
        }}
      />
    </div>
  );
};

export default V5Chart;