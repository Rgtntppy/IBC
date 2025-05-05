import React, { useEffect, useState, useRef } from 'react';
import dayjs from 'dayjs';
import './shipmentDesign.scss';
import { initialData, ShipmentData } from '../../data/initialData';
import { BinBlock } from './binBlocks/BinBlock';
import { useSyncScroll } from './useSyncScroll';
import { saveDayCells } from '../../firebase/firestoreService';
import { getNextBusinessDay } from '../../data/getNextBusinessDay';
import { TodayLabel } from './todayLabel/TodayLabel';
import { PopUp } from './popUp/PopUp';

const ShipmentTable: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(dayjs().format('YYYY/MM/DD'));
  const [displayDate, setDisplayDate] = useState(dayjs().format('YYYY年MM月DD日分'));
  const [isDateConfirmed, setIsDateConfirmed] = useState(false)
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

    const nextDate = getNextBusinessDay(new Date(currentDate));
    setCurrentDate(dayjs(nextDate).format('YYYY/MM/DD'));
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
    <TodayLabel
      currentDate={currentDate}
      setCurrentDate={setCurrentDate}
      displayDate={displayDate}
      setDisplayDate={setDisplayDate}
      isDateConfirmed={isDateConfirmed}
      setIsDateConfirmed={setIsDateConfirmed}
    />
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
      <PopUp
        setShowConfirmModal={setShowConfirmModal}
        prepareNextDay={prepareNextDay}
      />
    )}
    </>
  );
};

export default ShipmentTable;
