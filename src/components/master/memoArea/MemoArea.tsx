import './memoArea.scss';
import React, { useEffect, useRef } from 'react';
import { MemoAreaProps } from './memoAreaInterface';

export const MemoArea: React.FC<MemoAreaProps> = ({
    memo,
    setMemo,
    handleBlur,
}) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const initialSize = useRef<{ width: string; height: string; }>({ width: '', height: '' });

    useEffect(() => {
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