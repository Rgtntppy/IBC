import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import './shipmentTable.scss';
import { importAll } from '../img/importImages';
import { saveDayCells } from '../../firebase/firestoreDaysData/saveDaysData';
import { loadDayCells } from '../../firebase/firestoreDaysData/loadDaysData';
import { prepareNextDay } from '../../firebase/firestoreDaysData/prepareNextDay';
import { ShipmentData } from '../../data/binData/shipmentTableInterface'
import { BinData } from '../../data/binData/binData';
import { Header } from './header/Header';
import { BinBlock } from './binBlocks/BinBlock';
import { useSyncScroll } from './useSyncScroll';
import { getNextBusinessDay } from '../../data/getNextBusinessDay';
import { loadTodayLabelData } from '../../firebase/todayLabelData/loadtodayLabelData';
import { saveTodayLabelData } from '../../firebase/todayLabelData/savetodayLabelData';
import { TodayLabel } from './todayLabel/TodayLabel';
import { loadMemoData } from '../../firebase/memoAreaData/loadMemoData';
import { saveMemoData } from '../../firebase/memoAreaData/saveMemoData';
import { MemoArea } from './memoArea/MemoArea';
import { PrepareForTheNextDayPopUp } from './popUp/userControleBtn/prepareForTheNextDay/PrepareForTheNextDayPopUp';
import { Onlytoday } from './binBlocks/onlytoday/Onlytoday';
import { OnlytodaysBinData } from '../../data/binData/onlytodayBinData/onlytodaysBinData';
import { loadOnlytodayData } from '../../firebase/onlytodaysData/loadOnlytodaysData';
import { saveOnlytodayData } from '../../firebase/onlytodaysData/saveOnlytodaysData';
import { updateTodayValue } from '../../firebase/firestoreDaysData/updateTodayValue';
import { updateOnlytodayValue } from '../../firebase/onlytodaysData/updateOnlytodayValue';
import { YarnCat } from './accessaories/yarnCat/YarnCat';
import { OnlytodaysData } from '../../data/binData/onlytodayBinData/onlytodaysBinDataInterface';
import { ProhititionText } from './accessaories/prohibitionText/ProhibitionText';
import { resetAllAlerts } from '../../firebase/firestoreDaysData/resetAllAlerts';
import { ResetAllAlertsPopUp } from './popUp/userControleBtn/resetAllAlerts/ResetAllAlerts';
import { WarningPopup } from './popUp/userControleBtn/warningPopup/WarningPopup';
import { saveLog } from '../../firebase/saveLogData/saveLog';
import { SurplusPower } from './surplusPower/SurplusPower';

const ShipmentTable: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [userAuthority, setUserAuthority] = useState(0);
  const [hasInitialized, setHasInitialized] = useState(false);

  const [addCountFlag, setAddCountFlag] = useState(false);

  const [currentDate, setCurrentDate] = useState(dayjs().format('YYYY/MM/DD'));
  const [displayDate, setDisplayDate] = useState(dayjs().format('YYYY年MM月DD日分'));
  const [isDateConfirmed, setIsDateConfirmed] = useState(false)
  
  const [memo, setMemo] = useState('');
  
  const [binData, setBinData] = useState(BinData);
  const [onlytodaysBinData, setOnlytodaysBinData] = useState(OnlytodaysBinData);

  const [showWarningPopup, setShowWarningPopup] = useState(true);
  
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
      
      setUserId(user.id)
      setUserName(user.userName);
      setUserAuthority(user.authority)

      const data = await loadTodayLabelData();
      if (data) {
        setCurrentDate(data.currentDate);
        setDisplayDate(data.displayDate);
        setIsDateConfirmed(true);
      }

      //メモデータの取得
      loadMemoData().then(data => {
        if (data?.content) setMemo(data.content);
      });
      
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
      };
    };

    initialize();
  },[]);

  //初期化後の data 更新時のみ保存
  // useEffect(() => {
  //   if (hasInitialized) {
  //     
  //   }
  // }, [binData, onlytodaysBinData]);

  useEffect(() => {
    if (!hasInitialized) return;

    let previousBinData: any = null;
    
    const memoInterval = setInterval(async () => {
      await reloadMemoData();
    }, 20 * 60 * 1000);

    let binDataInterval: NodeJS.Timeout | null = null;

    if (userAuthority >= 5) {
      binDataInterval = setInterval(async () => {
        try {
          const updated = await loadDayCells();
          
          if (updated && JSON.stringify(updated) !== JSON.stringify(previousBinData)) {
            setBinData(updated);
            previousBinData = updated;
          }
        } catch (e) {
          console.error('ポーリング中にエラー:', e);
        }
      }, 15 * 60 * 1000)
    }

    return () => {
      clearInterval(memoInterval);
      if (binDataInterval) clearInterval(binDataInterval);
    }
  },[hasInitialized]);

  const reloadData = async () => {
    if (userAuthority < 1) return;

    const todayLabel = await loadTodayLabelData();
    if (todayLabel) {
      setCurrentDate(todayLabel.currentDate);
      setDisplayDate(todayLabel.displayDate);
    };

    loadMemoData().then(data => {
      if (data?.content) setMemo(data.content);
    });

    const loaded = await loadDayCells();
    if (loaded) setBinData(loaded);
    
    const loadedOnlytoday = await loadOnlytodayData();
    if (loadedOnlytoday) setOnlytodaysBinData(loadedOnlytoday);
  };
  
  const reloadMemoData = async () => {
    if (userAuthority < 1) return;

    const loadedmemoArea = await loadMemoData();
    if (loadedmemoArea) setMemo(loadedmemoArea.content);
  }

  useEffect(() => {
    if(hasInitialized){
      const timeout = setTimeout(() => {
        saveTodayLabelData({currentDate, displayDate});
        console.log('日付情報保存')
      }, 200)

      return () => clearTimeout(timeout);
    }
  }, [currentDate, displayDate]);

  
  const handleBlur = async () => {
    await saveMemoData({ content: memo });
  };

  const handleColorChange = async (id: number) => {
    if (userAuthority < 7) return;

    await updateTodayValue(id, 'binAlert');
  };

  const handleResetAllAlerts = async () => {
    if (userAuthority < 7) return;

    await resetAllAlerts();
  }

  const handleSubCountChange = async (
    id: number,
    key: '当日分手配品' | '翌日分手配品',
    diff: number,
    isTentative = false
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

    await saveLog({
      userId,
      userName,
      binName: targetBin ? targetBin.bin : '不明',
      key,
      diff,
      action: diff > 0 ? '増加' : '減少',
    });
  };

  const handleSubCountChangeTentative = useCallback((
    id: number,
    key: '当日分手配品',
    diff: number,
  ) => {
    handleSubCountChange(id, key, diff, true);
  }, [handleSubCountChange]);
    
  const handleChange = async (
    id: number,
    key: '当日分' | '翌日分',
    diff: number
    ) => {
    if (userAuthority < 5 || !addCountFlag) return;
    
    await updateTodayValue(id, key, diff);

    const targetBin = binData.find((bin) => bin.id === id);

    await saveLog({
      userId,
      userName,
      binName: targetBin ? targetBin.bin : '不明',
      key,
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

    await reloadData();
    await prepareNextDay();

    const ymd = currentDate.replace(/\D/g, '');
    const nextYMD = getNextBusinessDay(ymd);
    const nextDateDisplay = dayjs(nextYMD, 'YYYYMMDD').format('YYYY年MM月DD日分');

    setCurrentDate(dayjs(nextYMD).format('YYYY/MM/DD'));
    setDisplayDate(nextDateDisplay);

    await saveLog({
      userId,
      userName,
      binName: '全て',
      key: '翌日分準備',
      diff: false,
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
        memo={memo}
        setMemo={setMemo}
        handleBlur={handleBlur}
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
        memo={memo}
        setMemo={setMemo}
        handleBlur={handleBlur}
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
          />
        </div>
      </div>
      {showWarningPopup && (
        <WarningPopup
          userId={userId}
          onClose={() => setShowWarningPopup(false)}
        />
      )}
    </div>
  );
};

export default ShipmentTable;