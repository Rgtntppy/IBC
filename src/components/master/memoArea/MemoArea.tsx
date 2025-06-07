import './memoArea.scss';
import React, { useState, useEffect } from 'react';
import { loadMemoData } from '../../../firebase/memoAreaData/loadMemoData';
import { saveMemoData } from '../../../firebase/memoAreaData/saveMemoData';

export const MemoArea: React.FC = () => {
    const [memo, setMemo] = useState('');

    useEffect(() => {
        const fetchMemo = async () => {
            const data = await loadMemoData();
            if (data && typeof data.content === 'string') {
                setMemo(data.content);
            } else {
                setMemo('');
            }
        };
        fetchMemo();
    }, []);

    const handleBlur = async () => {
        await saveMemoData({ content: memo });
    };

    return (
        <textarea
            className='memoTextarea'
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            onBlur={handleBlur}
            placeholder='メモ欄'
        />
    );
};