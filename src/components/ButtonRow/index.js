import React from 'react';
import './styles.css';


function ButtonRow({children}) {
  return (
    <div className='buttonRow' >
      {children}
    </div>
  );
}

export default ButtonRow;