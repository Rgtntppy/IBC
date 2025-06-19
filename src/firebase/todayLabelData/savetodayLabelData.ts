import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { TodayLabelData } from './todayLabelDataInterface';
import { debounce } from 'lodash';

const _saveTodayLabelData = async (data: TodayLabelData) => {
    try {
        const ref = doc(db, 'todayLabel', 'dataInfo');
        await setDoc(ref, data);
        console.log('saveTodayLabelData実行')
    } catch (error) {
        console.error('Error saving TodayLabel data:', error);
    }
};

export const saveTodayLabelData = debounce(_saveTodayLabelData, 500);