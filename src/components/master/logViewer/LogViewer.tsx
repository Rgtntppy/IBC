import { useEffect, useMemo, useRef, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { LogViewerProps, LogViewerbtnProps } from './logEntry';
import Fuse, { FuseResult } from 'fuse.js';
import './logViewer.scss';

export const LogViewer: React.FC<LogViewerbtnProps> = ({
    handleclose,
}) => {
    const [logs, setLogs] = useState<LogViewerProps[]>([]);
    const [searchInput, setSearchInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const searchRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        searchRef.current?.focus();

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

    const fuse = useMemo(() => {
        return new Fuse<LogViewerProps>(logs, {
            keys: [
                { name: 'binName', weight: 0.7 },
                { name: 'userName', weight: 0.2 },
                {name: 'key', weight: 0.1 },
            ],
            threshold: 0.3,
        });
    }, [logs]);

    const filterdLogs = useMemo(() => {
        if (!searchQuery) return logs;

        const fuseResults = fuse.search(searchQuery) as FuseResult<LogViewerProps>[];
        const filteredSet = new Set(fuseResults.map((r) => r.item.id));
        return logs.filter((log) => filteredSet.has(log.id));
    }, [searchQuery, fuse, logs]);

    const handleSearch = () => {
        setSearchQuery(searchInput.trim());
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };
    
    return (
        <div className='logViewerContent'>
            <div className='logViewerHeader'>
                <h2
                    className='logViewerTitle'
                >
                    操作ログ
                </h2>
                <div className='searchBox'>
                    <input
                        type='text'
                        placeholder='検索...'
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className='searchInput'
                        ref={searchRef}
                    />
                    <button
                        className='btn searchBtn'
                        onClick={handleSearch}
                        >
                        検索
                    </button>
                </div>
            </div>
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
                        <th className='colTime'>時刻</th>
                        <th className='colUser'>ユーザー</th>
                        <th className='colBin'>便</th>
                        <th className='colKey'>key</th>
                        <th className='colDiff'>増減</th>
                    </tr>
                </thead>
                <tbody>
                    {filterdLogs.map((log) => {
                        const isIncrease = log.action === '増加';
                        const isDecrease = log.action === '減少';

                        const isTodayKey = log.key === '当日分';
                        const isTomorrowKey = log.key === '翌日分';
                        const isArrangedTodaysItem = log.key ==='当日分手配品';
                        const isArrangedTomorrowsItem = log.key === '翌日分手配品';

                        const isAdminUser = log.userId.includes('809617');
                        
                        let diffDisplay ='';
                        if (typeof log.diff === 'number') {
                            diffDisplay = (isIncrease ? '+' : isDecrease ? '-' : '') + Math.abs(log.diff);
                        } else {
                            diffDisplay = String(log.diff);
                        }
                        
                        return (
                            <tr key={log.id}>
                                <td className='colTime'>
                                    {log.timestamp ? new Date(log.timestamp.seconds * 1000).toLocaleString() : ''}
                                </td>
                                <td className={`colUser ${isAdminUser ? 'userHighlight' : ''}`}>
                                    {log.userName} ({log.userId})
                                </td>
                                <td className='colBin'>
                                    {log.binName}
                                </td>
                                <td
                                    className={`colKey ${
                                        isTodayKey || isArrangedTodaysItem ? 'keyToday' :
                                        isTomorrowKey || isArrangedTomorrowsItem ? 'keyTomorrow' :
                                        ''
                                    }`}
                                >
                                    {log.key}
                                </td>
                                <td
                                    className={`colDiff ${
                                        isIncrease ? 'logIncrease' :
                                        isDecrease ? 'logDecrease' :
                                        ''
                                    }`}
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