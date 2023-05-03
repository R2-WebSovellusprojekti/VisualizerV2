import React from 'react';

function DeleteChartButton({ onClick }) {
  return (
    <div onClick={onClick}>
      <button className='delete-chart-button'>Delete Chart</button>
    </div>
  );
}

export default DeleteChartButton;