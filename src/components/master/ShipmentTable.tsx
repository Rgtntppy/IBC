import React, { useEffect, useState } from 'react';
import './ShipmentDesign.scss';
import { initialData, ShipmentData } from '../../data/initialData';
import { BinBlock } from './BinBlock';
import { useSyncScroll } from './useSyncScroll';
import { saveDayCells } from '../../firebase/firestoreService';
import { getNextBusinessDay } from '../../data/getNextBusinessDay';

const ShipmentTable: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [data, setData] = useState(initialData);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { amRef, pmRef } = useSyncScroll();

  useEffect(() => {
    saveDayCells(data);
  },[data]);

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

  const prepareNextDay = () => {
    setData(prev =>
      prev.map(item => ({
        ...item,
        today: item.tomorrow,
        tomorrow: 0,
        isLargeDrumToday: item.isLargeDrumTomorrow,
        isLargeDrumTomorrow: false
      }))
    );

    setCurrentDate(prevDate => getNextBusinessDay(prevDate));
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
    [ 68, 69, 810]
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
    <div className='todayDate'>
      <input
        className='days'
        type='date'
        value={currentDate.toISOString().split('T')[0]}
        onChange={e => setCurrentDate(new Date(e.target.value))}
      />
      <p className='daysText'>
        日分
      </p>
    </div>
    <div className='todayBinGrid'>
      <div ref={pmRef} className='binGrid pmBinGrid'>
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

      <div ref={amRef} className='binGrid amBinGrid'>
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
        <button className='prepareNextDay' onClick={() => setShowConfirmModal(true)}>
          翌日分準備
        </button>
      </div>
    </div>

    {showConfirmModal && (
      <div className='modal-overlay'>
        <div className='modal-content'>
          <p>本日分のデータは失われますが<br/>よろしいでしょうか？</p>
          <div className='modal-buttons'>
            <button onClick={() => {
              prepareNextDay();
              setShowConfirmModal(false);
            }}>
              はい
            </button>
            <button onClick={() => setShowConfirmModal(false)}>
              いいえ
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default ShipmentTable;
