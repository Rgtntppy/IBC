import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const getNextAlert = (current: string, hasHighlight: boolean): string => {
    const normalCycle = ['white', 'yellow', 'red'];
    const highlightedCycle = ['white', 'yellow', 'red'];

    const cycle = hasHighlight ? highlightedCycle : normalCycle;
    const idx = cycle.indexOf(current);
    const next = idx === -1 ? 'white' : cycle[(idx + 1) % cycle.length];
    return next;
};

export const updateTodayValue = async (
    id: number,
    key?: 'binAlert' | 'today' | 'arrangedTodaysItem' | 'isLargeDrumToday' | 'tomorrow' | 'arrangedTomorrowsItem' | 'isLargeDrumTomorrow',
    diff?: number | boolean,
) => {
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

    const updatedData = data.data.map((item: any) => {
        if (item.id !== id) return item;

        if (key === 'binAlert') {
            return {
                ...item,
                binAlert: getNextAlert(item.binAlert, !!item.highlight)
            }
        }

        if (key === 'today') {
            return {
                ...item,
                today: Math.min(50, Math.max(0, (item.today ?? 0) + (diff as number))),
            };
        }
        if (key === 'arrangedTodaysItem') {
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

        if (key === 'tomorrow') {
            return {
                ...item,
                tomorrow: Math.min(50, Math.max(0, (item.tomorrow ?? 0) + (diff as number))),
            };
        }
        if (key === 'arrangedTomorrowsItem') {
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
};