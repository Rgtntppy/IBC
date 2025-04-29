import React, { useState } from 'react';
import './ShipmentDesign.scss';
import { initialData, ShipmentData } from '../../data/initialData';
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
    [  1, 80,  3,  8],
    [ 70, 71, 72, 73],
    [ 74, 75, 76, 77],
    [ 78, 79, 81, 95, 96]
  ];

  const AMBin = [
    [  2,  5,  4, 9],
    [ 61, 62, 63],
    [ 64, 65, 66, 67],
    [ 68, 69]
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
          className={`binColumn ${colIndex == 1 ? 'column-lifted' : ''}`}
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
    </>
  );
};

export default ShipmentTable;
