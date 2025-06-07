import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { MemoAreaProps } from '../../components/master/memoArea/memoAreaInterface';

export const loadMemoData = async (): Promise<MemoAreaProps | null> => {
    try {
        const docRef = doc(db, 'memos', 'sharedMemo');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data().content || '';
        } else {
            return null;
        }
    } catch (error) {
        console.error('メモの読み込みエラー:', error);
        return null;
    }
};