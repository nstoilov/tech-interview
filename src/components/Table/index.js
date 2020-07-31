import React from 'react';
import Row from '../Row/index';
function Table({rows, columns, data}) {
    const renderRows = () => {
        const displayRows = [];
        for (let i = 0; i < rows; i++) {
            displayRows.push(<Row columns={columns} key={i} data={data.slice(i*columns, (i+1)*columns)}/>)
        }
        return displayRows

    }

  return (
    <div>
      {renderRows()}
    </div>
  );
}

export default Table;
