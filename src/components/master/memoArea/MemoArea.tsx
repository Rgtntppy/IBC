import './memoArea.scss';
import { MemoMessageItem } from '../memoMessages/MemoMessageItem';
import { MemoAreaProps } from './memoAreaInterface';
import { useEffect, useRef, useState } from 'react';
import { MemoMessage } from '../memoMessages/memoMessagesInterface';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';

export const MemoArea: React.FC<MemoAreaProps> = ({
    userId,
    userName,
    userAuthority,
}) => {
    const [messages, setMessages] = useState<MemoMessage[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const viewerRef = useRef<HTMLDivElement>(null);
    const resetTimerRef = useRef<NodeJS.Timeout | null>(null);
    const DEFAUT_SIZE = { width: 280, height: 50 };

    useEffect(() => {
        const q = query(
            collection(db, 'memoMessages'),
            orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(q, snapshot => {
            const list = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            })) as MemoMessage[];

            setMessages(list);
            setCurrentIndex(0);
        });

        return () => unsubscribe();
    }, []);

    const startResize = (e: React.MouseEvent) => {
        e.preventDefault();

        const startX = e.clientX;
        const startY = e.clientY;

        const el = viewerRef.current;
        if (!el) return;

        const startWidth = el.offsetWidth;
        const startHeight = el.offsetHeight;

        const onMouseMove = (moveEvent: MouseEvent) => {
            el.style.width = startWidth + (moveEvent.clientX - startX) + 'px';
            el.style.height = startHeight + (moveEvent.clientY - startY) + 'px';
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            handleResizeEnd();
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }

    const handleResizeEnd = () => {
        if (resetTimerRef.current) {
            clearTimeout(resetTimerRef.current);
        }

        resetTimerRef.current = setTimeout(() => {
            if (!viewerRef.current) return;

            viewerRef.current.style.width = `${DEFAUT_SIZE.width}px`;
            viewerRef.current.style.height = `${DEFAUT_SIZE.height}px`;
        }, 3000);
    };

    if (messages.length === 0) {
        return (
            <div className='memoViewerWrapper'>
                <div className='memoViewer empty'>
                    現在メモはありません
                </div>
            </div>
        );
    }

    const message = messages[currentIndex];

    return (
        <div className='memoViewerWrapper'>
            <div
                className='memoViewer'
                ref={viewerRef}
                onMouseUp={handleResizeEnd}
            >
                <MemoMessageItem
                    message={message}
                    user={{ uid: userId, name: userName}}
                    userAuthority={userAuthority}
                    onKeyDown={() => {}}
                />
                <div
                    className='resizeHandle'
                    onMouseDown={startResize}
                />
            </div>

            <div className='memoNav'>
                <button
                    onClick={() => setCurrentIndex(i => i + 1)}
                    disabled={currentIndex >= messages.length - 1}
                    >
                    ▲
                </button>
                <button
                    onClick={() => setCurrentIndex(i => i - 1)}
                    disabled={currentIndex <= 0}
                    >
                    ▼
                </button>
            </div>
        </div>
    );
};