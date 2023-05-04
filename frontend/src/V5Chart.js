import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';

const V5Chart = () => {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [activeSector, setActiveSector] = useState(null);
  const [activeSubSector, setActiveSubSector] = useState(null);


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
    const keySelector = !activeSector
      ? 'sector'
      : !activeSubSector
      ? 'sub_sector'
      : 'sub_sector_det';
  
    const sectorData = data
      .filter((item) => !activeSector || item.sector === activeSector)
      .filter((item) => !activeSubSector || item.sub_sector === activeSubSector)
      .filter((item) => item.sector !== null && (!activeSector || item.sub_sector !== null))
      .reduce((acc, item) => {
        const key = item[keySelector];
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
  }, [data, activeSector, activeSubSector]);

  const handleClick = (elements, chart) => {
    if (!elements.length) return;
  
    const index = elements[0].index;
    const label = chartData.labels[index];
  
    if (!activeSector) {
      setActiveSector(label);
    } else if (!activeSubSector) {
      setActiveSubSector(label);
    } else {
      setActiveSubSector(null);
      setActiveSector(null);
    }
  };

  if (!chartData) {
    return null;
  }

  return (
    <div className="n4chart-container">
      <div className="chart-column">
      <figure>
        <figcaption style={{ color: 'white' }}>
        This doughnut chart shows CO2 emission percentages by sectors. By clicking certain sector you can see their subsectors CO2 emissions.
        The dataset can be found at <a href='https://ourworldindata.org/uploads/2020/09/Global-GHG-Emissions-by-sector-based-on-WRI2020.xlsx
' style={{color: 'white'}}> here</a>, and the description can be found <a href='https://ourworldindata.org/emissions-by-sector#co2-emissions-by-sector' style={{color: 'white'}}> here</a>.
  </figcaption>
  </figure>
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
    </div>
  );
};

export default V5Chart;