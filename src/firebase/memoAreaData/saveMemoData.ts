import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { MemoAreaData } from './memoAreaInterface';

export const saveMemoData = async (content: MemoAreaData): Promise<void> => {
    try {
        const docRef = doc(db, 'memos', 'sharedMemo');
        await setDoc(docRef, { content }, { merge: true });
    } catch (error) {
        console.error('メモの保存エラー:', error);
    }
};