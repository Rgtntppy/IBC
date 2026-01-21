import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { TodayLabelData } from './todayLabelDataInterface';

export const subscribeTodayLabelData = (
    onChange: (data: TodayLabelData) => void
) => {
    const ref = doc(db, 'todayLabel', 'dataInfo');
    
    return onSnapshot(ref, (docSnap) => {
        if (!docSnap.exists) return;
        onChange(docSnap.data() as TodayLabelData);
    });
};