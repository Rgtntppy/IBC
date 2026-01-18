import './memoBoard.scss';
import { deleteDoc, doc, updateDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { useEffect, useRef, useState } from 'react';
import { ConfirmDialog } from '../popUp/confirmDialog/ConfirmDialog';
import { MemoMessageItemProps } from './memoMessagesInterface';

export const MemoMessageItem: React.FC<MemoMessageItemProps> = ({
    message,
    user,
    userAuthority,
    onKeyDown,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(message.content);
    const [showConfirm, setShowConfirm] = useState(false);

    const canEdit = message.createdByUid === user.uid || userAuthority >= 7;
    const editAreaRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (isEditing && textareaRef.current) {
            const el  = textareaRef.current;
            const len = el.value.length;
            
            el.focus();
            el.setSelectionRange(len, len);
        }
    }, [isEditing]);

    useEffect(() => {
        if (!isEditing) return;

        const handleClickOutside = (e: MouseEvent) => {
            if (
                editAreaRef.current &&
                !editAreaRef.current.contains(e.target as Node)
            ) {
                handleUpdate();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isEditing, text]);

    const formatDateTime = (timestamp?: Timestamp) => {
        if (!timestamp) return '';
    
        const date = timestamp.toDate();
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1);
        const dd = String(date.getDate());
        const hh = String(date.getHours()).padStart(2, '0');
        const min = String(date.getMinutes()).padStart(2, '0');
    
        return `${yyyy}/${mm}/${dd} ${hh}:${min}`;
    };

    const displayTime = message.updatedAt ?? message.createdAt;
    

    const handleUpdate = async () => {
        if (text === message.content) {
            setIsEditing(false);
            return;
        }

        await updateDoc(doc(db, 'memoMessages', message.id), {
        content: text,
        updatedAt: serverTimestamp(),
        updatedByUid: user.uid,
        });

        setIsEditing(false);
    };

    const handleDelete = async () => {
        await deleteDoc(doc(db, 'memoMessages', message.id));
        setShowConfirm(false);
    };

    return (
        <div className='memoMessageItem'>
            <div className='userInformation'>
                <div className='userName'>{message.createdByName}</div>
                <div className='messageDate'>
                    {formatDateTime(displayTime)}
                </div>
                {canEdit && (
                    <div className='messageControls'>
                        
                        {isEditing ? (
                            <button
                                className='messageControlbtn savebtn'
                                onClick={handleUpdate}
                            >
                                保存
                            </button>
                        ) : (
                            ''
                        )}
                        <button
                            onClick={() => setIsEditing(true)}
                            className='messageControlbtn addbtn'
                        >
                            編集
                        </button>
                        <button
                            onClick={() => setShowConfirm(true)}
                            className='messageControlbtn deletebtn'
                        >
                            削除
                        </button>
                    </div>    
                )}
            </div>

            {isEditing ? (
                <div className='editArea' ref={editAreaRef}>
                    <textarea
                        ref={textareaRef}
                        className='editTextarea'
                        value={text}
                        onChange={e => setText(e.target.value)}
                        onKeyDown={e => onKeyDown(e, handleUpdate)}
                    />
                </div>
            ) : (
                <div
                    className='messageContent'
                >
                    {message.content}
                </div>
            )}


            {showConfirm && (
                <ConfirmDialog
                    isOpen={showConfirm}
                    message={`このメモを削除しますか？\n\n${text}`}
                    onConfirm={handleDelete}
                    onCancel={() => setShowConfirm(false)}
                />
            )}
        </div>
    );
};
