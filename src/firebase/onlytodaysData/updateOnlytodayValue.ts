import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const updateOnlytodayValue = async (
    id: number,
    key: 'today' | 'isLargeDrumToday',
    diff?: number | boolean,
) => {
    const docRef = doc(db, 'onlyDayCells', 'onlytoday_latest');

    // 現在のデータ取得
    const snap = await getDoc(docRef);
    if (!snap.exists()) {
        console.error('Document does not exist');
        return;
    }

    const data = snap.data();

    const updatedData = data.data.map((item: any) => {
        if (item.id !== id) return item;

        if (key === 'today') {
            return {
                ...item,
                today: Math.min(50, Math.max(0, (item.today ?? 0) + (diff as number))),
            };
        }
        if (key === 'isLargeDrumToday') {
            return {
                ...item,
                isLargeDrumToday: !item.isLargeDrumToday,
            };
        }
        return item;
    });

    // Firestore に書き込み
    await updateDoc(docRef, {
        data: updatedData,    
    })
};