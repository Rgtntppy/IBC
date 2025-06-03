import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { TodayLabelData } from './todayLabelDataInterface';

export const saveTodayLabelData = async (data: TodayLabelData) => {
    try {
        const ref = doc(db, 'todayLabel', 'dataInfo');
        await setDoc(ref, data);
    } catch (error) {
        console.error('Error saving TodayLabel data:', error);
    }
};