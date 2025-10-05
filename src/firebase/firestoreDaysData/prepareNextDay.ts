import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const _prepareNextDay = async () => {
    const docRef = doc(db, 'dayCells', 'latest');

    const snap = await getDoc(docRef);
    if (!snap.exists()) {
        console.error('Document does not exist');
        return;
    }

    const data = snap.data();
    if (!Array.isArray(data.data)) {
        console.error('Invalid data structure');
        return;
    }

    const updatedData = data.data.map((item: any) => {
        return {
            ...item,
            today: item.tomorrow ?? 0,
            arrangedTodaysItem: item.arrangedTomorrowsItem ?? 0,
            tomorrow: 0,
            arrangedTomorrowsItem: 0,
            isLargeDrumToday: item.isLargeDrumTomorrow ?? false,
            isLargeDrumTomorrow: false
        };
    });

    await updateDoc(docRef, {
        data: updatedData,
    });
};

export const prepareNextDay =  _prepareNextDay;