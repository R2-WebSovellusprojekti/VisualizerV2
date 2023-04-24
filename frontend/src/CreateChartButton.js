import React from 'react';

function CreateChartButton({ onClick }) {
  return (
    <div onClick={onClick}>
      <button className='create-chart-button'>Create Chart</button>
    </div>
  );
}

export default CreateChartButton;