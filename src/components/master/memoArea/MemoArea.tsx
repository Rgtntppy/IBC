import './memoArea.scss';
import React, { useEffect, useRef } from 'react';
import { MemoAreaProps } from './memoAreaInterface';

export const MemoArea: React.FC<MemoAreaProps> = ({
    memo,
    setMemo,
    handleBlur,
    userAuthority,
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

    const preventFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        if (userAuthority < 3) {
            e.target.blur();
        }
    };

    return (
        <textarea
            ref={textareaRef}
            className='memoTextarea'
            value={memo}
            onChange={(e) => userAuthority >=3 && setMemo(e.target.value)}
            onBlur={ userAuthority >= 3 ? handleBlur : undefined}
            placeholder='メモ欄'
            maxLength={300}
            readOnly={userAuthority < 3}
            onFocus={preventFocus}
        />
    );
};