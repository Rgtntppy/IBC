import './memoBoard.scss';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { useEffect, useRef, useState } from 'react';
import { MemoBoardProps, MemoKeyDownHandler, MemoMessage } from './memoMessagesInterface';
import { MemoMessageItem } from './MemoMessageItem';
import { MemoInput } from './MemoInput';

export const MemoBoard: React.FC<MemoBoardProps> = ({
    user,
    userAuthority,
}) => {
  const [messages, setMessages] = useState<MemoMessage[]>([]);
  const lastCompositionEndRef = useRef(0);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const q = query(
      collection(db, 'memoMessages'),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list: MemoMessage[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }) as MemoMessage);

      setMessages(list);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleCompositionEnd = () => {
    lastCompositionEndRef.current = Date.now();
  };

  const handleKeyDown: MemoKeyDownHandler = (e, onSubmit) => {
      const now = Date.now();
      if (now - lastCompositionEndRef.current < 50) return;
      
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        onSubmit();
      }
  };

  return (
    <div className='memoBoard'>
      <div className='memoMessageList'>
        {messages.length === 0 ? (
          <div className='noMemoMessage'>
            現在メモはありません
          </div>
        ) : (
          messages.map((message) => (
            <MemoMessageItem
            key={message.id}
            message={message}
            user={user}
            userAuthority={userAuthority}
            onKeyDown={handleKeyDown}
            />
            ))
            )}
        <div ref={bottomRef} />
      </div>
      <MemoInput
        user={user}
        onKeyDown={handleKeyDown}
        onCompositionEnd={handleCompositionEnd}    
      />
    </div>
  );
};
