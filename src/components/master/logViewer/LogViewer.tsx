import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { LogViewerProps, LogViewerbtnProps } from './logEntry';
import './logViewer.scss';

export const LogViewer: React.FC<LogViewerbtnProps> = ({
    handleclose,
}) => {
    const [logs, setLogs] = useState<LogViewerProps[]>([]);
    
    useEffect(() => {
        const q = query(collection(db, 'logs'), orderBy('timestamp', 'desc'));
        const unsub = onSnapshot(q, (snapshot) => {
            const entries = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as LogViewerProps[];
            setLogs(entries);
        });
        
        return () => unsub();
    }, []);
    
    return (
        <div className='logViewerContent'>
            <h2
                className='logViewerTitle'
                >
                操作ログ
            </h2>
            <div className='userControle'>
                <button
                    className='btn closebtn'
                    onClick={handleclose}
                >
                    閉じる
                </button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>時刻</th>
                        <th>ユーザー</th>
                        <th>便</th>
                        <th>key</th>
                        <th>増減</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log) => {
                        const isIncrease = log.action === '増加';
                        const isDecrease = log.action === '減少';
                        
                        let diffDisplay ='';
                        if (typeof log.diff === 'number') {
                            diffDisplay = (isIncrease ? '+' : isDecrease ? '-' : '') + Math.abs(log.diff);
                        } else {
                            diffDisplay = String(log.diff);
                        }
                        
                        return (
                            <tr key={log.id}>
                                <td>{log.timestamp ? new Date(log.timestamp.seconds * 1000).toLocaleString() : ''}</td>
                                <td>{log.userName} ({log.userId})</td>
                                <td>{log.binName}</td>
                                <td>{log.key}</td>
                                <td
                                    className={
                                        isIncrease ? 'logIncrease' : isDecrease ? 'logDecrease' : ''
                                    }
                                    >
                                    {log.action} ({diffDisplay})
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};