import React from 'react';
import Cell from '../Cell/index';
import './styles.css';

function Row({columns, data}) {
    const renderCells = () => {
        const displayCells = [];
        for (let i = 0; i < columns; i++) {
            displayCells.push(<Cell key={i} item={data[i]} />)
        }
        return displayCells

    }
// style={{display: 'flex', flexDirection: 'row'}}
  return (
    <div className='row' >
      {renderCells()}
    </div>
  );
}

export default Row;
