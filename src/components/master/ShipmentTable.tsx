import React, { useState } from 'react';
import './ShipmentDesign.scss';
import { initialData, ShipmentData } from '../../data/initialData';
import { BinBlock } from './BinBlock';
import { useSyncScroll } from './useSyncScroll';
import { saveDayCells } from '../../firebase/firestoreService';

const ShipmentTable: React.FC = () => {
  const [data, setData] = useState(initialData);
  const { amRef, pmRef } = useSyncScroll();

  const handleChange = (id: number, key: 'today' | 'tomorrow', diff: number) => {
    setData(prev =>
      prev.map(item =>
        item.id === id
        ? { ...item, [key]: Math.max(0, item[key] + diff) }
        : item
      )
    );
  };

  const handleCheckboxToggle = (id: number, key: 'isLargeDrumToday' | 'isLargeDrumTomorrow') => {
    setData(prev => 
      prev.map(item =>
        item.id === id
          ? { ...item, [key]: !item[key] }
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
    <div ref={pmRef} className="binGrid">
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
              onCheckboxToggle={handleCheckboxToggle}
            />
          ))}
        </div>
      ))}
    </div>

    <div ref={amRef} className="binGrid">
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
              onCheckboxToggle={handleCheckboxToggle}
            />
          ))}
        </div>
      ))}
      </div>
    </>
  );
};

export default ShipmentTable;
