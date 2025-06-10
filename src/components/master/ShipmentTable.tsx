import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import './shipmentDesign.scss';
import { importAll } from '../img/importImages';
import { saveDayCells } from '../../firebase/firestoreDaysData/saveDaysData';
import { loadDayCells } from '../../firebase/firestoreDaysData/loadDaysData';
import { ShipmentData } from '../../data/binData/shipmentTableInterface'
import { BinData } from '../../data/binData/binData';
import { Header } from './header/Header';
import { BinBlock } from './binBlocks/BinBlock';
import { useSyncScroll } from './useSyncScroll';
import { getNextBusinessDay } from '../../data/getNextBusinessDay';
import { TodayLabel } from './todayLabel/TodayLabel';
import { MemoArea } from './memoArea/MemoArea';
import { PrepareForTheNextDayPopUp } from './popUp/prepareForTheNextDay/PrepareForTheNextDayPopUp';
import { Onlytoday } from './binBlocks/onlytoday/Onlytoday';
import { OnlytodaysBinData } from '../../data/binData/onlytodayBinData/onlytodaysBinData';
import { saveOnlytodayData } from '../../firebase/onlytodaysData/saveOnlytodaysData';
import { loadOnlytodayData } from '../../firebase/onlytodaysData/loadOnlytodaysData';

const ShipmentTable: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [userAuthority, setUserAuthority] = useState(0);
  const [currentDate, setCurrentDate] = useState(dayjs().format('YYYY/MM/DD'));
  const [displayDate, setDisplayDate] = useState(dayjs().format('YYYY年MM月DD日分'));
  const [isDateConfirmed, setIsDateConfirmed] = useState(false)
  const [hasInitialized, setHasInitialized] = useState(false);
  const [binData, setBinData] = useState(BinData);
  const [onlytodaysBinData, setOnlytodaysBinData] = useState(OnlytodaysBinData);
  
  const navigate = useNavigate();
  const { amRef, pmRef } = useSyncScroll();

  // 初回読み込み処理
  useEffect(() => {
    const initialize = async () => {
      const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
      if (!user.id || !user.role) {
        navigate('/');
        return;
      }
      
      setUserName(user.userName);
      setUserAuthority(user.authority)
      
      //通常便データの取得
      const loaded = await loadDayCells();
      if (loaded) setBinData(loaded);

      //仮便データの取得
      const loadedOnlytoday = await loadOnlytodayData();
      if (loadedOnlytoday) setOnlytodaysBinData(loadedOnlytoday);
      
      setHasInitialized(true);
    };

    initialize();
  },[]);

  //初期化後の data 更新時のみ保存
  useEffect(() => {
    if (hasInitialized) {
      saveDayCells(binData);
      saveOnlytodayData(onlytodaysBinData);
    }
  }, [binData, onlytodaysBinData, hasInitialized]);

  const reloadData = async () => {
    if (userAuthority < 1) return;
    const loaded = await loadDayCells();
    if (loaded) setBinData(loaded);

    const loadedOnlytoday = await loadOnlytodayData();
    if (loadedOnlytoday) setOnlytodaysBinData(loadedOnlytoday);

    toast.success('更新されました', {
      position: 'top-center',
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
    });
  };

  const getNextAlert = (current: string, hasHighlight: boolean): string => {
    const normalCycle = ['white', 'yellow', 'red'];
    const highlightedCycle = ['white', 'yellow', 'red'];

    const cycle = hasHighlight ? highlightedCycle : normalCycle;
    const idx = cycle.indexOf(current);
    const next = idx === -1 ? 'white' : cycle[(idx + 1) % cycle.length];
    return next;
  }

  const handleColorChange = (id: number) => {
    if (userAuthority < 5) return;
    setBinData(prev =>
      prev.map(item =>
        item.id === id
        ? {
          ...item,
          binAlert:
            getNextAlert(item.binAlert, !!item.highlight)
        }
        : item
      )
    );
  };
  
  const handleChange = (id: number, key: 'today' | 'tomorrow', diff: number) => {
    if (userAuthority < 5) return;
    setBinData(prev =>
      prev.map(item =>
        item.id === id
        ? { 
          ...item,
          [key]: (() => {
            const newVal = (item[key] ?? 0) + diff;
            if (newVal <  0) return  0;
            if (newVal > 50) return 50;
            return newVal;
          })(),
        }
        : item
      )
    );
  };

  const handleCheckboxToggle = (id: number, key: 'isLargeDrumToday' | 'isLargeDrumTomorrow') => {
    if (userAuthority < 5) return;
    setBinData(prev => 
      prev.map(item =>
        item.id === id
          ? { ...item, [key]: !item[key] }
          : item
      )
    );
  };

  const handleNameChangeTentative = (id: number, newName: string) => {
    if (userAuthority < 5) return;

    setOnlytodaysBinData(prev => {
      const updated = prev.map(item =>
        item.id === id ? { ...item, bin: newName } : item
      );

      saveOnlytodayData(updated);

      return updated;
    });
  };

  const handleChangeTentative = (id: number, key: 'today', diff: number) => {
    if (userAuthority < 5) return;
    setOnlytodaysBinData(prev =>
      prev.map(item =>
        item.id === id
        ? { ...item, [key]: Math.max(0, (item[key] ?? 0) + diff) }
        : item
      )
    );
  };

  const handleCheckboxTentative = (id: number, key: 'isLargeDrumToday') => {
    if (userAuthority < 5) return;
    setOnlytodaysBinData(prev =>
      prev.map(item =>
        item.id === id
        ? { ...item, [key]: !item[key] }
      : item
      )
    );
  };

  const prepareNextDay = () => {
    if (userAuthority < 5) return;
    setBinData(prev =>
      prev.map(item => 
        TentativeIDs.includes(item.id)
        ? item
        : {
        ...item,
        today: item.tomorrow ?? 0,
        tomorrow: 0,
        isLargeDrumToday: item.isLargeDrumTomorrow ?? false,
        isLargeDrumTomorrow: false
        }
      )
    );

    const ymd = currentDate.replace(/\D/g, '');
    const nextYMD = getNextBusinessDay(ymd);
    const nextDateDisplay = dayjs(nextYMD, 'YYYYMMDD').format('YYYY年MM月DD日');

    setCurrentDate(dayjs(nextYMD).format('YYYY/MM/DD'));
    setDisplayDate(nextDateDisplay);
    
    // toast.success('更新されました', {
    //   position: 'top-center',
    //   autoClose: 1000,
    //   hideProgressBar: true,
    //   closeOnClick: true,
    //   pauseOnHover: false,
    //   draggable: false,
    // });
  };

  const PMBin = [
    [  1, 80,  3],
    [ 70, 71, 72, 73],
    [ 74, 75, 76, 77],
    [ 78, 79, 81, 95, 96]
  ];

  const AMBin = [
    [  2,  5,  4],
    [ 61, 62, 63],
    [ 64, 65, 66, 67],
    [ 68, 69, 810]
  ];

  const TentativeIDs = useMemo(() => [ 8, 9], []);

  const pmColumns = PMBin.map(col =>
    col.map(id => binData.find(d => d.id === id)).filter(Boolean) as ShipmentData[]
  );

  const amColumns = AMBin.map(col =>
    col.map(id => binData.find(d => d.id === id)).filter(Boolean) as ShipmentData[]
  );

  const tentative1 = onlytodaysBinData.find(d => d.id === 8);
  const tentative2 = onlytodaysBinData.find(d => d.id === 9);

  const images = importAll(
    require.context('../img/cat', false, /\.(png|jpe?g|gif)$/)
  );

  const yarnCat = images['2481223.jpg'];

  return (
    <div className='shipmentTable'>
      <Header
        userName={userName}
        userAuthority={userAuthority}
        reloadData={reloadData}
      />
      <ToastContainer/>
      <TodayLabel
        hasInitialized={hasInitialized}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        displayDate={displayDate}
        setDisplayDate={setDisplayDate}
        isDateConfirmed={isDateConfirmed}
        setIsDateConfirmed={setIsDateConfirmed}
        prepareNextDay={prepareNextDay}
        authority={userAuthority}
      />
      <MemoArea/>
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
                  onColorChange={handleColorChange}
                  />
                  ))}
            </div>
          ))}
          {tentative1 && (
            <Onlytoday
              {...tentative1}
              onChange={handleChangeTentative}
              onCheckboxToggle={handleCheckboxTentative}
              onNameChange={handleNameChangeTentative}
              userAuthority={userAuthority}
            />
          )}
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
                  onColorChange={handleColorChange}
                />
              ))}
            </div>
          ))}
          {tentative2 && (
            <Onlytoday
              {...tentative2}
              onChange={handleChangeTentative}
              onCheckboxToggle={handleCheckboxTentative}
              onNameChange={handleNameChangeTentative}
              userAuthority={userAuthority}
            />
          )}
          <div>
            {yarnCat && 
              <img
                className='yarnCat'
                src={yarnCat}
                alt='毛糸猫'
              />
            }
          </div>
          <PrepareForTheNextDayPopUp
            userAuthority={userAuthority}
            prepareNextDay={prepareNextDay}
          />
        </div>
      </div>
    </div>
  );
};

export default ShipmentTable;