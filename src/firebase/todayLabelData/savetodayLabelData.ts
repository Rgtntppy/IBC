import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { TodayLabelData } from './todayLabelDataInterface';

export const loadTodayLabelData = async (): Promise<TodayLabelData | null> => {
    try {
        const ref = doc(db, 'todayLabel', 'dateInfo');
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
            return docSnap.data() as TodayLabelData;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error loading TodayLabel data:', error);
        return null;
    }
};