import './memoArea.scss';
import React, { useState, useEffect, useRef } from 'react';
import { loadMemoData } from '../../../firebase/memoAreaData/loadMemoData';
import { saveMemoData } from '../../../firebase/memoAreaData/saveMemoData';

export const MemoArea: React.FC = () => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const initialSize = useRef<{ width: string; height: string; }>({ width: '', height: '' });

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

        const ta = textareaRef.current;
        if (!ta) return;

        //初期サイズを保存
        initialSize.current = {
            width: ta.offsetWidth + 'px',
            height: ta.offsetHeight + 'px',
        };

        const handleMouseDown = () => {
            ta.style.resize = 'both';
        };

        const handleMouseUp = () => {
            ta.style.resize = 'none';
            
            setTimeout(() => {
                ta.style.width = initialSize.current.width;
                ta.style.height = initialSize.current.height;
                ta.style.resize = 'both';
            }, 1000);
        };

        ta.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);
        
        return () => {
            ta.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    const handleBlur = async () => {
        await saveMemoData({ content: memo });
    };

    return (
        <textarea
            ref={textareaRef}
            className='memoTextarea'
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            onBlur={handleBlur}
            placeholder='メモ欄'
            maxLength={300}
        />
    );
};