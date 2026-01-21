import {
    addDoc,
    collection,
    serverTimestamp,
    query,
    orderBy,
    limit,
    getDocs,
    startAfter,
    deleteDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import { LogEntry } from './logEntry';

const LOGS_COLLECTION = 'logs';
const MAX_LOGS = 300;

export const saveLog = async (entry: LogEntry) => {
    try {
        // 新しいログを保存
        await addDoc(collection(db, LOGS_COLLECTION), {
            ...entry,
            timestamp: serverTimestamp(),
        });

        // 最新MAX_LOGSを取得
        const latestQuery = query(
            collection(db, LOGS_COLLECTION),
            orderBy('timestamp', 'desc'),
            limit(MAX_LOGS)
        );
        const latestSnapshot = await getDocs(latestQuery);

        // MAX_LOGS未満なら削除不要
        if (latestSnapshot.size < MAX_LOGS) return;

        // 最後のドキュメントを基準にする
        const lastDoc = latestSnapshot.docs[latestSnapshot.docs.length - 1];

        // それより古いログを取得
        const oldLogsQuery = query(
            collection(db, LOGS_COLLECTION),
            orderBy('timestamp', 'desc'),
            startAfter(lastDoc)
        );
        const oldSnapshot = await getDocs(oldLogsQuery);

        // 古いログを削除
        for (const doc of oldSnapshot.docs) {
            await deleteDoc(doc.ref);
        }
    } catch (error) {
        console.error('ログ保存エラー:', error);
    }
};