import React, { useEffect, useState, useRef } from 'react';
import dayjs from 'dayjs';
import './ShipmentDesign.scss';
import { initialData, ShipmentData } from '../../data/initialData';
import { BinBlock } from './BinBlock';
import { useSyncScroll } from './useSyncScroll';
import { saveDayCells } from '../../firebase/firestoreService';
import { getNextBusinessDay } from '../../data/getNextBusinessDay';

const ShipmentTable: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(dayjs().format('YYYY/MM/DD'));
  const [displayDate, setDisplayDate] = useState(dayjs().format('YYYY年MM月DD日分'));
  const [yearInput, setYearInput] = useState('');
  const [monthDayInput, setMonthDayInput] = useState('');
  const [isDateConfirmed, setIsDateConfirmed] = useState(false)
  const [data, setData] = useState(initialData);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  
  const yearInputRef = useRef<HTMLInputElement>(null);
  const monthDayInputRef = useRef<HTMLInputElement>(null);
  const { amRef, pmRef } = useSyncScroll();

  useEffect(() => {
    saveDayCells(data);
  },[data]);

  const formatAndSetDate = (year: string, mmdd: string) => {
    if (year.length === 4 && mmdd.length === 4) {
      const formatted = `${year}/${mmdd.slice(0, 2)}/${mmdd.slice(2, 4)}`;
      const formattedDisplay = `${year}年${mmdd.slice(0, 2)}月${mmdd.slice(2, 4)}日分`;
      setCurrentDate(formatted);
      setDisplayDate(formattedDisplay);
    }
  }

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setYearInput(value);
    formatAndSetDate(value, monthDayInput);
  };

  const handleMonthDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setMonthDayInput(value);
    formatAndSetDate(yearInput, value);
  };

  const handleDateConfirm = () => {
    if (yearInput.length === 4 && monthDayInput.length === 4) {
      const formattedDisplay = `${yearInput}年${monthDayInput.slice(0, 2)}月${monthDayInput.slice(2, 4)}日分`;
      setDisplayDate(formattedDisplay);
      setIsDateConfirmed(true);
    }
  }

  const handleInputBlur = () => {
    setTimeout(() => {
      const isYearFocused = document.activeElement === yearInputRef.current;
      const isMonthDayFocused = document.activeElement === monthDayInputRef.current;

      if (!isYearFocused && !isMonthDayFocused) {
        handleDateConfirm();
      }
    }, 0);
  };

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
    <div className='todayLabel'>
      {!isDateConfirmed ? (
        <div className='todayDate'>
          <input
            className='yearInput'
            type='text'
            value={yearInput}
            onChange={handleYearChange}
            placeholder='2025'
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleDateConfirm();
            }}
            onBlur={handleInputBlur}
            ref={yearInputRef}
          />
          <input
            className='monthDayInput'
            type='text'
            value={monthDayInput}
            onChange={handleMonthDayChange}
            placeholder='0401'
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleDateConfirm();
            }}
            onBlur={handleInputBlur}
            ref={monthDayInputRef}
          />
        </div>
      ) : (
        <p
          className='daysText'
          onClick={() => {
            const parsed = dayjs(currentDate);
            setYearInput(parsed.format('YYYY'));
            setMonthDayInput(parsed.format('MMDD')); 
            setIsDateConfirmed(false);

            setTimeout(() => {
              monthDayInputRef.current?.focus();
            }, 0);
          }}
        >
          {displayDate}
        </p>
      )}
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
