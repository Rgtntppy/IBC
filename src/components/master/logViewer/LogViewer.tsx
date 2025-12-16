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
    const [searchBin, setSearchBin] = useState('');
    const [searchKey, setSearchKey] = useState('');
    const [searchQueryBin, setSearchQueryBin] = useState('');
    const [searchQueryKey, setSearchQueryKey] = useState('');
    const [searchMode, setSearchMode] = useState<'AND' | 'OR'>('AND');
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

    const fuseBin = useMemo(() => {
        return new Fuse<LogViewerProps>(logs, {
            keys: [
                { name: 'binName', weight: 0.7 },
                { name: 'userName', weight: 0.2 },
                { name: 'key', weight: 0.1 },
            ],
            threshold: 0.3,
        });
    }, [logs]);

    const fuseKey = useMemo(() => {
        return new Fuse<LogViewerProps>(logs, {
            keys: [
                { name: 'key', weight: 0.7 },
                { name: 'userName', weight: 0.2 },
                { name: 'binName', weight: 0.1 },
            ],
            threshold: 0.3,
        });
    }, [logs]);

    const filterdLogs = useMemo(() => {
        let result = logs;

        const hasBin = !!searchQueryBin;
        const hasKey = !!searchQueryKey;

        if (!hasBin && !hasKey) return logs;

        const resBin = hasBin ? fuseBin.search(searchQueryBin) : [];
        const resKey = hasKey ? fuseKey.search(searchQueryKey) : [];

        const idsBin = new Set(resBin.map(r => r.item.id));
        const idsKey = new Set(resKey.map(r => r.item.id));

        if (searchMode === 'AND') {
            return result.filter(log =>
                (!hasBin || idsBin.has(log.id)) &&
                (!hasKey || idsKey.has(log.id))
            );
        } else {
            return result.filter(log =>
                (hasBin && idsBin.has(log.id)) ||
                (hasKey && idsKey.has(log.id))
            );
        }
    }, [logs, searchQueryBin, searchQueryKey, fuseBin, fuseKey, searchMode]);

    const handleSearch = (
        bin = searchBin,
        key = searchKey,
    ) => {
        setSearchQueryBin(bin.trim());
        setSearchQueryKey(key.trim());
    };

    const handleClear = () => {
        setSearchBin('');
        setSearchKey('');
        handleSearch('', '');
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
                        placeholder='便名で検索...'
                        value={searchBin}
                        onChange={(e) => setSearchBin(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className='searchInput'
                        ref={searchRef}
                    />
                    <button
                        className={`btn searchModeBtn ${searchMode === 'OR' ? 'or' : ''}`}
                        onClick={() => setSearchMode(prev => prev === 'AND' ? 'OR' : 'AND')}
                    >
                        {searchMode}
                    </button>
                    <input
                        type='text'
                        placeholder='keyで検索...'
                        value={searchKey}
                        onChange={(e) => setSearchKey(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className='searchInput'
                    />
                    <button
                        className='btn searchBtn'
                        onClick={() => handleSearch()}
                        >
                        検索
                    </button>
                    <button
                        className='btn clearBtn'
                        onClick={handleClear}
                    >
                        クリア
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
                        const isTodayKey = log.key.includes('当日分');
                        const isTomorrowKey = log.key.includes('翌日分');
                        const isArrangedTodaysItem = log.key.includes('当日分手配品');
                        const isArrangedTomorrowsItem = log.key.includes('翌日分手配品');
                        
                        const isIncrease = log.action === '増加';
                        const isDecrease = log.action === '減少';

                        const greenAlert = log.diff === 'グリーン';
                        const yellowAlert = log.diff === 'イエロー';
                        const redAlert = log.diff === 'レッド';

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
                                    className={`
                                        colDiff ${
                                        isIncrease  ? 'logIncrease' :
                                        isDecrease  ? 'logDecrease' :
                                        greenAlert  ? 'greenAlert' :
                                        yellowAlert ? 'yellowAlert' :
                                        redAlert    ? 'redAlert' :
                                        ''
                                        }
                                    `}
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