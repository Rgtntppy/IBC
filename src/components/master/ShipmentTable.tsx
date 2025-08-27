import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import './shipmentDesign.scss';
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
import { PrepareForTheNextDayPopUp } from './popUp/prepareForTheNextDay/PrepareForTheNextDayPopUp';
import { Onlytoday } from './binBlocks/onlytoday/Onlytoday';
import { OnlytodaysBinData } from '../../data/binData/onlytodayBinData/onlytodaysBinData';
import { loadOnlytodayData } from '../../firebase/onlytodaysData/loadOnlytodaysData';
import { saveOnlytodayData } from '../../firebase/onlytodaysData/saveOnlytodaysData';
import { updateTodayValue } from '../../firebase/firestoreDaysData/updateTodayValue';
import { updateOnlytodayValue } from '../../firebase/onlytodaysData/updateOnlytodayValue';
import { YarnCat } from './accessaories/yarnCat/YarnCat';
import { OnlytodaysData } from '../../data/binData/onlytodayBinData/onlytodaysBinDataInterface';
import { ProhititionText } from './accessaories/prohibitionText/ProhibitionText';

const ShipmentTable: React.FC = () => {
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
          isLargeDrumToday: item.isLargeDrumToday ?? false,
          tomorrow: item.tomorrow ?? 0,
          isLargeDrumTomorrow: item.isLargeDrumTomorrow ?? false,
          binAlert: item.binAlert ?? 'white',
          highlight: item.highlight,
          limit: item.limit,
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
    }, 15 * 60 * 1000);

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
    if (userAuthority < 5) return;

    await updateTodayValue(id, 'binAlert');
  };
  
  const handleChange = async (id: number, key: 'today' | 'tomorrow', diff: number) => {
    if (userAuthority < 5 || !addCountFlag) return;
    
    await updateTodayValue(id, key, diff);
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
  };

  const handleCheckboxTentative = async (
    id: number,
    key: 'isLargeDrumToday',
    ) => {
    if (userAuthority < 5 || !addCountFlag) return;

    await updateOnlytodayValue(id, key);
  };

  const handleDeleteTentative = (
    id: number
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
        addCountFlag={addCountFlag}
        setAddCountFlag={setAddCountFlag}
        reloadData={reloadData}
        memo={memo}
        setMemo={setMemo}
        handleBlur={handleBlur}
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
          <PrepareForTheNextDayPopUp
            userAuthority={userAuthority}
            handlePrepareNextDay={handlePrepareNextDay}
          />
        </div>
      </div>
    </div>
  );
};

export default ShipmentTable;