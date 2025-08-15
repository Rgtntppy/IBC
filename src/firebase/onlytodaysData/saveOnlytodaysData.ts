import { db } from '../firebase'
import { doc, setDoc } from 'firebase/firestore';
import { OnlytodaysData } from './onlytodaysDataInterface';
import { debounce } from 'lodash'

const ONLYTODAY_DOC_ID = 'onlytoday_latest'

const _saveOnlytodayData = async (onlytodaysData: OnlytodaysData[]) => {
    try {
        await setDoc(doc(db, 'onlyDayCells', ONLYTODAY_DOC_ID), {
            data: onlytodaysData,
            createdAt: new Date(),
        });
        console.log('仮便データ保存')
    } catch (e) {
        console.error('Error saving document: ', e);
    }
};

export const saveOnlytodayData = debounce(_saveOnlytodayData, 500);