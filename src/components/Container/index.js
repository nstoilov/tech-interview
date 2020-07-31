import React from 'react';
import './styles.css';


function Container({children}) {
  return (
    <div className='container' >
      {children}
    </div>
  );
}

export default Container;