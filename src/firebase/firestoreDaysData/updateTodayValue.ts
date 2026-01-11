import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { AlertColor, getNextAlert } from '../../data/binData/alertColor';

export const updateTodayValue = async (
    id: number,
    key?: 'binAlert' | '当日分' | '当日分手配品' | 'isLargeDrumToday' | '翌日分' | '翌日分手配品' | 'isLargeDrumTomorrow',
    diff?: number | boolean,
): Promise<AlertColor | undefined> => {
    
    const docRef = doc(db, 'dayCells', 'latest');

    // 現在のデータ取得
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

    let nextColor: AlertColor | undefined;

    const updatedData = data.data.map((item: any) => {
        if (item.id !== id) return item;

        if (key === 'binAlert') {
            const next = getNextAlert(item.binAlert, !!item.highlight);
            nextColor = next;

            return {
                ...item,
                binAlert: next,
            };
        }

        if (key === '当日分') {
            return {
                ...item,
                today: Math.min(50, Math.max(0, (item.today ?? 0) + (diff as number))),
            };
        }
        if (key === '当日分手配品') {
            return {
                ...item,
                arrangedTodaysItem: Math.min(50, Math.max(0, (item.arrangedTodaysItem ?? 0) + (diff as number))),
            };
        }
        if (key === 'isLargeDrumToday') {
            return {
                ...item,
                isLargeDrumToday: !item.isLargeDrumToday,
            };
        }

        if (key === '翌日分') {
            return {
                ...item,
                tomorrow: Math.min(50, Math.max(0, (item.tomorrow ?? 0) + (diff as number))),
            };
        }
        if (key === '翌日分手配品') {
            return {
                ...item,
                arrangedTomorrowsItem: Math.min(50, Math.max(0, (item.arrangedTomorrowsItem ?? 0) + (diff as number))),
            };
        }
        if (key === 'isLargeDrumTomorrow') {
            return {
                ...item,
                isLargeDrumTomorrow: !item.isLargeDrumTomorrow,
            };
        }
        return item;
    });

    // Firestore に書き込み
    await updateDoc(docRef, {
        data: updatedData,    
    })

    return nextColor;
};