import { db } from '../firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { TodayLabelData } from './todayLabelDataInterface';

export const saveTodayLabelData = async (data: TodayLabelData) => {
    try {
        const ref = doc(db, 'todayLabel', 'dataInfo');

        await setDoc(ref, {
            ...data,
            updatedAt: serverTimestamp(),
        });

        console.log('TodayLabel saved');
    } catch (error) {
        console.error('Error saving TodayLabel:', error);
    }
};
