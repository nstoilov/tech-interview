import React from 'react';
import './styles.css';


function Cell({item}) {
  return (
    <div className='cell' >
      {item}
    </div>
  );
}

export default Cell;
