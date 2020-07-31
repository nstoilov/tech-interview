import React from 'react';
import './styles.css';

function Button({ children, id, onClick, isDisabled, getClass }) {

  return (
    <button className={`${getClass(id)} button`} disabled={isDisabled(id)} onClick={() => onClick(id)}>{children}</button>
  );
}

export default Button;
