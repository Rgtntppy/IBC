import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import './shipmentTable.scss';
import { importAll } from '../img/importImages';
import { loadDayCells } from '../../firebase/firestoreDaysData/loadDaysData';
import { prepareNextDay } from '../../firebase/firestoreDaysData/prepareNextDay';
import { ShipmentData } from '../../data/binData/shipmentTableInterface'
import { BinData } from '../../data/binData/binData';
import { Header } from './header/Header';
import { BinBlock } from './binBlocks/BinBlock';
import { useSyncScroll } from './useSyncScroll';
import { getNextBusinessDay } from '../../data/getNextBusinessDay';
import { subscribeTodayLabelData } from '../../firebase/todayLabelData/subscribeTodayLabelData';
import { TodayLabel } from './todayLabel/TodayLabel';
import { MemoArea } from './memoArea/MemoArea';
import { PrepareForTheNextDayPopUp } from './popUp/userControleBtn/prepareForTheNextDay/PrepareForTheNextDayPopUp';
import { Onlytoday } from './binBlocks/onlytoday/Onlytoday';
import { OnlytodaysBinData } from '../../data/binData/onlytodayBinData/onlytodaysBinData';
import { loadOnlytodayData } from '../../firebase/onlytodaysData/loadOnlytodaysData';
import { saveOnlytodayData } from '../../firebase/onlytodaysData/saveOnlytodaysData';
import { alertColorLabelMap } from '../../data/binData/alertColor'; 
import { updateTodayValue } from '../../firebase/firestoreDaysData/updateTodayValue';
import { updateOnlytodayValue } from '../../firebase/onlytodaysData/updateOnlytodayValue';
import { YarnCat } from './accessaories/yarnCat/YarnCat';
import { OnlytodaysData } from '../../data/binData/onlytodayBinData/onlytodaysBinDataInterface';
import { ProhititionText } from './accessaories/prohibitionText/ProhibitionText';
import { resetAllAlerts } from '../../firebase/firestoreDaysData/resetAllAlerts';
import { ResetAllAlertsPopUp } from './popUp/userControleBtn/resetAllAlerts/ResetAllAlerts';
import { UnifiedWarningPopup } from './popUp/userControleBtn/unifiedWarningPopup/UnifiedWarningPopup';
import { saveLog } from '../../firebase/saveLogData/saveLog';
import { WarningConfig } from './popUp/userControleBtn/unifiedWarningPopup/warningConfigInterface';
import { saveTodayLabelData } from '../../firebase/todayLabelData/saveTodayLabelData';

const ShipmentTable: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [userAuthority, setUserAuthority] = useState(0);
  const [hasInitialized, setHasInitialized] = useState(false);

  const [addCountFlag, setAddCountFlag] = useState(false);

  const [currentDate, setCurrentDate] = useState(dayjs().format('YYYY/MM/DD'));
  const [displayDate, setDisplayDate] = useState(dayjs().format('YYYY年MM月DD日分'));
  const [isDateConfirmed, setIsDateConfirmed] = useState(false)
  
  const nextYMD = getNextBusinessDay(currentDate);
  const nextNextYMD = getNextBusinessDay(nextYMD);
  
  const shortDate = displayDate.replace(
    /^(\d{4})年0?(\d{1,2})月0?(\d{1,2})日分$/,
    '$2/$3'
  );
  
  const shortNextDate = nextYMD.replace(
    /^(\d{4})(\d{2})(\d{2})$/,
    (_, y, m, d) => `${Number(m)}/${Number(d)}`
  );

  const shortNextNextDate = nextNextYMD.replace(
    /^(\d{4})(\d{2})(\d{2})$/,
    (_, y, m, d) => `${Number(m)}/${Number(d)}`
  );
    
  const [binData, setBinData] = useState(BinData);
  const [onlytodaysBinData, setOnlytodaysBinData] = useState(OnlytodaysBinData);

  const [showWarningPopup, setShowWarningPopup] = useState(true);
  const [showCVWarningPopup, setShowCVWarningPopup] = useState(true);
  
  const navigate = useNavigate();
  const { amRef, pmRef } = useSyncScroll();
  const reopenTimerRef = useRef<number | null>(null);

  // 初回読み込み処理
  useEffect(() => {
    const initialize = async () => {
      const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
      if (!user.id || !user.role) {
        navigate('/');
        return;
      }
      
      setUserId(user.id)
      setUserName(user.userName);
      setUserAuthority(user.authority)

      // const data = await loadTodayLabelData();
      // if (data) {
      //   setCurrentDate(data.currentDate);
      //   setDisplayDate(data.displayDate);
      //   setIsDateConfirmed(true);
      // }
      
      //通常便データの取得
      const loaded = await loadDayCells();
      if (loaded) setBinData(loaded);

      const unscribe = onSnapshot(doc(db, 'dayCells', 'latest'),
        (docSnapshot) => {
          if (!docSnapshot.exists()) {
            console.log('ドキュメントが存在しません: dayCells/latest');
            return;
          }

          const dayCellsData = docSnapshot.data();
          const rawArray = dayCellsData.data;

          if (!Array.isArray(rawArray)) {
            console.error('dayCellsData.data フィールドが配列ではありません:', rawArray);
            return;
          }
          
          const loadedData: ShipmentData[] = rawArray.map((item: any) => ({
            id: Number(item.id),
            bin: item.bin ?? '',
            today: item.today ?? 0,
            arrangedTodaysItem: item.arrangedTodaysItem ?? 0,
            isLargeDrumToday: item.isLargeDrumToday ?? false,
            tomorrow: item.tomorrow ?? 0,
            arrangedTomorrowsItem: item. arrangedTomorrowsItem ?? 0,
            isLargeDrumTomorrow: item.isLargeDrumTomorrow ?? false,
            binAlert: item.binAlert ?? 'white',
            highlight: item.highlight,
            alertborder: item.alertborder,
          }));

          setBinData(loadedData);
        }
      );
      
      //仮便データの取得
      const loadedOnlytoday = await loadOnlytodayData();
      if (loadedOnlytoday) setOnlytodaysBinData(loadedOnlytoday);

      const unsubscribe = onSnapshot(doc(db, 'onlyDayCells', 'onlytoday_latest'),
      (docSnapshot) => {
        if (!docSnapshot.exists()) {
          console.log('ドキュメントが存在しません: dayCells/onlytoday_latest');
          return;
        }

        const onlytodayData = docSnapshot.data();
        const rawArray = onlytodayData?.data;

        if (!Array.isArray(rawArray)) {
          console.error('onlytodayData フィールドが配列ではありません:', rawArray);
          return;
        }

        const loadedData: OnlytodaysData[] = rawArray.map((item: any) => ({
          id: Number(item.id),
          bin: item.bin ?? '',
          today: item.today ?? 0,
          arrangedTodaysItem: item.arrangedTodaysItem ?? 0,
          isLargeDrumToday: item.isLargeDrumToday ?? false,
        } as OnlytodaysData
        ));

        setOnlytodaysBinData(loadedData);
      });

      setHasInitialized(true);
      
      return () => {
        unscribe();
        unsubscribe();

        if (reopenTimerRef.current) {
          clearTimeout(reopenTimerRef.current);
        }
      };
    };

    initialize();
  },[]);

  const reloadData = async () => {
    if (userAuthority < 1) return;
  };

  const handleColorChange = async (
    id: number,
    isTentative = false,
    ) => {
    if (userAuthority < 4) return;

    const targetBin = isTentative
      ? onlytodaysBinData.find((bin) => bin.id === id)
      : binData.find((bin) => bin.id === id);

    const nextColor = await updateTodayValue(id, 'binAlert');
    if (nextColor === undefined) return; 

    await saveLog({
      userId,
      userName,
      binName: targetBin ? targetBin.bin : '不明',
      key: 'binAlert',
      diff: alertColorLabelMap[nextColor],
      action: '更新',
    })
  };

  const handleResetAllAlerts = async () => {
    if (userAuthority < 8) return;

    await resetAllAlerts();

    await saveLog({
      userId,
      userName,
      binName: '全て',
      key: 'binAlert',
      diff: 0,
      action: '更新',
    })
  }

  const handleSubCountChange = async (
    id: number,
    key: '当日分手配品' | '翌日分手配品',
    diff: number,
    date?: string,
    isTentative = false,
  ) => {
    if (userAuthority < 7 || !addCountFlag) return;

    if (isTentative) {
      await updateOnlytodayValue(id, 'arrangedTodaysItem', diff);
    } else {
      await updateTodayValue(id, key, diff);
    }

    const targetBin = isTentative
      ? onlytodaysBinData.find((bin) => bin.id === id)
      : binData.find((bin) => bin.id === id);

    const logKey =
      key.startsWith('当日分')
        ? `当日分手配品(${date})`
        : `翌日分手配品(${date})`;

    await saveLog({
      userId,
      userName,
      binName: targetBin ? targetBin.bin : '不明',
      key: logKey,
      diff,
      action: diff > 0 ? '増加' : '減少',
    });
  };

  const handleSubCountChangeTentative = useCallback((
    id: number,
    key: '当日分手配品',
    diff: number,
  ) => {
    handleSubCountChange(id, key, diff, undefined, true);
  }, [handleSubCountChange]);
    
  const handleChange = async (
    id: number,
    key: string,
    diff: number,
    date?: string,
    ) => {
    if (userAuthority < 5 || !addCountFlag) return;

    const pureKeyMap = {
      '当日分': '当日分',
      '当日分手配品': '当日分手配品',
      '翌日分': '翌日分',
      '翌日分手配品': '翌日分手配品',
      'isLargeDrumToday': 'isLargeDrumToday',
      'isLargeDrumTomorrow': 'isLargeDrumTomorrow',
      'binAlert': 'binAlert'
    } as const;
    
    const pureKey = 
    key.startsWith('当日分') ? '当日分' :
    key.startsWith('翌日分') ? '翌日分' :
    key;
    
    const pureKeyTyped = pureKeyMap[pureKey as keyof typeof pureKeyMap];
    
    await updateTodayValue(id, pureKeyTyped, diff);

    const targetBin = binData.find((bin) => bin.id === id);

    const logKey = 
      key.startsWith('当日分')
        ? `当日分(${date})`
        : `翌日分(${date})`;

    await saveLog({
      userId,
      userName,
      binName: targetBin ? targetBin.bin : '不明',
      key: logKey,
      diff,
      action: diff > 0 ? '増加' : '減少',
    });
  };

  const handleCheckboxToggle = async (id: number, key: 'isLargeDrumToday' | 'isLargeDrumTomorrow') => {
    if (userAuthority < 5 || !addCountFlag) return;
    
    await updateTodayValue(id, key);
  };

  const handleNameChangeTentative = (
    id: number,
    newName: string,
    ) => {
    if (userAuthority < 5) return;

    setOnlytodaysBinData(prev => {
      const updated = prev.map(item =>
        item.id === id ? { ...item, bin: newName } : item
      );

      saveOnlytodayData(updated);

      return updated;
    });
  };

  const handleChangeTentative = async (
    id: number,
    key: 'today',
    diff: number,
    ) => {
    if (userAuthority < 5 || !addCountFlag) return;

    await updateOnlytodayValue(id, key, diff);

    const targetBin = onlytodaysBinData.find((onlytodaysBinData) => onlytodaysBinData.id === id);

    await saveLog({
      userId,
      userName,
      binName: targetBin ? targetBin.bin : '不明',
      key,
      diff,
      action: diff > 0 ? '増加' : '減少',
    });
  };

  const handleCheckboxTentative = async (
    id: number,
    key: 'isLargeDrumToday',
    ) => {
    if (userAuthority < 5 || !addCountFlag) return;

    await updateOnlytodayValue(id, key);
  };

  const handleDeleteTentative = async (
    id: number,
    key: string,
    ) => {
    const initialValue = OnlytodaysBinData.find(item => item.id === id);
    if (!initialValue) return;

    setOnlytodaysBinData(prev => {
      const updated = prev.map(item =>
        item.id === id ? { ...initialValue } : item
      );

      saveOnlytodayData(updated);
      return updated;
    });

    const targetBin = onlytodaysBinData.find((onlytodaysBinData) => onlytodaysBinData.id === id);

    await saveLog({
      userId,
      userName,
      binName: targetBin ? targetBin.bin : '不明',
      key: 'today',
      diff: 0,
      action: '削除',
    })
  };

  const handlePrepareNextDay = async () => {
    if (userAuthority < 8) return;

    await prepareNextDay();

    const ymd = currentDate.replace(/\D/g, '');
    const nextYMD = getNextBusinessDay(ymd);
    const nextDateDisplay = dayjs(nextYMD, 'YYYYMMDD').format('YYYY年MM月DD日分');

    setCurrentDate(dayjs(nextYMD).format('YYYY/MM/DD'));
    setDisplayDate(nextDateDisplay);

    await saveTodayLabelData({
      currentDate: dayjs(nextYMD).format('YYYY/MM/DD'),
      displayDate: nextDateDisplay,
    });

    await saveLog({
      userId,
      userName,
      binName: '全て',
      key: '翌日分準備',
      diff: true,
      action: '更新',
    })

    toast.success('保存が完了しました', {
      position: 'top-center',
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
    });
  };

  const handleWarningClose = () => {
    setShowWarningPopup(false);

    if (reopenTimerRef.current) {
      clearTimeout(reopenTimerRef.current);
    }

    reopenTimerRef.current = window.setTimeout(() => {
      setShowWarningPopup(true);
    }, 4 * 60 * 60 * 1000);
  };

  const handleCVWarningClose = () => {
    setShowCVWarningPopup(false);

    if (reopenTimerRef.current) {
      clearTimeout(reopenTimerRef.current);
    }

    reopenTimerRef.current = window.setTimeout(() => {
      setShowCVWarningPopup(true);
    }, 3 * 60 * 60 * 1000);
  }

  const warningCVConfig: WarningConfig = {
    userId: userId,
    targetIds: ['808122'],
    message: <>エリアアラートをご活用ください</>,
    ruleDepartmentId: 1,
    ruleTextId: 121,
    onClose: handleCVWarningClose,
  };

  const warningPickConfig: WarningConfig = {
    userId: userId,
    targetIds: ['808121'],
    message: <>
      手配品のドラムについては、便・行先・数量が判明し次第、
      <span className='redmarker'>
          必ず担当者へ報告してください。
      </span>
    </>,
    ruleDepartmentId: 3,
    ruleTextId: 301,
    onClose: handleWarningClose,
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
        userId={userId}
        userName={userName}
        userAuthority={userAuthority}
        addCountFlag={addCountFlag}
        setAddCountFlag={setAddCountFlag}
        reloadData={reloadData}
      />
      <ToastContainer/>
      <div className='userInfo'>
        <p className='welcomeText'>
          ようこそ
          <span className='userName'>
          {userName}    
          </span>
          さん
        </p>
      </div>
      <TodayLabel
        hasInitialized={hasInitialized}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        displayDate={displayDate}
        setDisplayDate={setDisplayDate}
        isDateConfirmed={isDateConfirmed}
        setIsDateConfirmed={setIsDateConfirmed}
        handlePrepareNextDay={handlePrepareNextDay}
        authority={userAuthority}
      />
      <MemoArea
        userId={userId}
        userName={userName}
        userAuthority={userAuthority}
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
                  onSubCountChange={handleSubCountChange}
                  onCheckboxToggle={handleCheckboxToggle}
                  onColorChange={handleColorChange}
                  addCountFlag={addCountFlag}
                  shortDate={shortDate}
                  shortNextDate={shortNextDate}
                  />
                  ))}
            </div>
          ))}
          {tentative1 && (
            <Onlytoday
              {...tentative1}
              onChange={handleChangeTentative}
              onSubChangeTentative={handleSubCountChangeTentative}
              onCheckboxToggle={handleCheckboxTentative}
              onNameChange={handleNameChangeTentative}
              userAuthority={userAuthority}
              addCountFlag={addCountFlag}
              onDelete={handleDeleteTentative}
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
                  onSubCountChange={handleSubCountChange}
                  onCheckboxToggle={handleCheckboxToggle}
                  onColorChange={handleColorChange}
                  addCountFlag={addCountFlag}
                  shortDate={colIndex === 0 ? shortDate : shortNextDate}
                  shortNextDate={colIndex === 0 ? shortNextDate : shortNextNextDate}
                />
              ))}
            </div>
          ))}
          {tentative2 && (
            <Onlytoday
              {...tentative2}
              onChange={handleChangeTentative}
              onSubChangeTentative={handleSubCountChangeTentative}
              onCheckboxToggle={handleCheckboxTentative}
              onNameChange={handleNameChangeTentative}
              userAuthority={userAuthority}
              addCountFlag={addCountFlag}
              onDelete={handleDeleteTentative}
            />
          )}
          <ProhititionText />
          <div>
            {yarnCat && 
              <YarnCat
                yarnCat={yarnCat}
              />
            }
          </div>
          <ResetAllAlertsPopUp
            userAuthority={userAuthority}
            handleResetAllAlerts={handleResetAllAlerts}
          />
          <PrepareForTheNextDayPopUp
            userAuthority={userAuthority}
            handlePrepareNextDay={handlePrepareNextDay}
            displayDate={displayDate}
          />
        </div>
      </div>
      <UnifiedWarningPopup config={warningCVConfig}/>
      <UnifiedWarningPopup config={warningPickConfig}/>
    </div>
  );
};

export default ShipmentTable;