import React, { useState } from 'react';
import './ShipmentDesign.scss';
import { initialData, ShipmentData } from '../data/initialData';
import { BinBlock } from './BinBlock';

const ShipmentTable: React.FC = () => {
  const [data, setData] = useState(initialData);

  const handleChange = (id: number, key: 'today' | 'tomorrow', diff: number) => {
    setData(prev =>
      prev.map(item =>
        item.id === id
        ? { ...item, [key]: Math.max(0, item[key] + diff) }
        : item
      )
    );
  };

  const PMBin = [
    [  1, 24,  3],
    [ 14, 15, 16, 17],
    [ 18, 19, 20, 21],
    [ 22, 23, 25, 26, 27]
  ];

  const AMBin = [
    [  2,  4],
    [  5,  6,  7],
    [  8,  9, 10, 11],
    [ 12, 13]
  ]

  const pmColumns = PMBin.map(col =>
    col.map(id => data.find(d => d.id === id)).filter(Boolean) as ShipmentData[]
  );

  const amColumns = AMBin.map(col =>
    col.map(id => data.find(d => d.id === id)).filter(Boolean) as ShipmentData[]
  );

  return (
    <>
    <h1>ドラム出荷数管理表</h1>
    <div className="binGrid">
      {pmColumns.map((col, colIndex) => (
        <div 
          key={colIndex}
          className={`binColumn ${colIndex < 3 ? 'column-lifted' : ''}`}
        >
          {col.map((row, rowIndex) => (
            <BinBlock 
              key={row.id}
              row={row}
              onChange={handleChange}
            />
          ))}
        </div>
      ))}
    </div>

    <div className="binGrid">
      {amColumns.map((col, colIndex) => (
        <div
          key={colIndex}
          className={`binColumn ${colIndex < 2 ? 'column-lifted' : ''}`}
        >
          {col.map((row, rowIndex) => (
            <BinBlock 
              key={row.id}
              row={row}
              onChange={handleChange}
              className={colIndex === 0 && rowIndex === 1 ? 'spaced' : ''}
            />
          ))}
        </div>
      ))}
      </div>
    </>
  );
};

export default ShipmentTable;
