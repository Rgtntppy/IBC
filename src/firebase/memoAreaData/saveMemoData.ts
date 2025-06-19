import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { MemoAreaData } from './memoAreaInterface';
import { debounce } from 'lodash';

const _saveMemoData = async (content: MemoAreaData): Promise<void> => {
    try {
        const docRef = doc(db, 'memos', 'sharedMemo');
        await setDoc(docRef, { content }, { merge: true });
        console.log('saveMemoData実行')
    } catch (error) {
        console.error('メモの保存エラー:', error);
    }
};

export const saveMemoData = debounce(_saveMemoData, 500);