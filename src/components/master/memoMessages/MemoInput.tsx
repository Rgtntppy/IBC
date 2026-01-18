import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { useRef, useState } from 'react';
import { MemoInputProps } from './memoMessagesInterface';

export const MemoInput: React.FC<MemoInputProps> = ({
  user,
  onKeyDown,
  onCompositionEnd,
}) => {
  const [text, setText] = useState('');

  const handleSend = async () => {
    if (!text.trim()) return;

    await addDoc(collection(db, 'memoMessages'), {
      content: text,
      createdAt: serverTimestamp(),
      createdByUid: user.uid,
      createdByName: user.name,
    });

    setText('');
  };

  return (
    <div className='memoInput'>
        <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => onKeyDown(e, handleSend)}
            onCompositionEnd={onCompositionEnd}
            maxLength={300}
            className='memoInputTextarea'
        />
        <button
            onClick={handleSend}
            className='submitbtn'
        >
            送信
        </button>
    </div>
  );
};
