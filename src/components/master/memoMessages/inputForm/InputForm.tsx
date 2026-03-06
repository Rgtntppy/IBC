import './inputForm.scss';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../../firebase/firebase';
import { use, useEffect, useRef, useState } from 'react';
import { StructuredMemoFormProps, MemoBlock } from './inputFormInterface';
import { CustomerForm } from './customerForm/CustomerForm';

const emptyBlock: MemoBlock = {
    date: '',
    bin: '',
    destination: '',
    item: '',
    size: '',
    slipNo: '', 
};

export const StructuredMemoForm:React.FC<StructuredMemoFormProps> = ({ user, onClose }) => {
    const [blocks, setBlocks] = useState<MemoBlock[]>([
        { ...emptyBlock },
        { ...emptyBlock },
    ]);
    
    const [activeCount, setActiveCount] = useState<number>(2);

    const firstDateRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const     dateRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        firstDateRef.current?.focus();
    }, []);

    useEffect(() => {
        if (activeCount <= 2) return;

        const newIndex = activeCount -1;
        const target = dateRefs.current[newIndex];

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
            
            const timer = setTimeout(() => {
                target.focus();
            }, 300);

            return () => clearTimeout(timer);
        }
    }, [activeCount]);

    const updateBlock = (
        index: number,
        key: keyof MemoBlock,
        value: string,
    ) => {
        const newBlocks = [...blocks];
        newBlocks[index][key] = value;
        setBlocks(newBlocks);
    };

    const isBlockFilled = (block: MemoBlock) => {
        return Object.values(block).some(v => v !== '');
    };

    const isBlockValid = (block: MemoBlock) => {
        return (
            block.date &&
            block.bin &&
            block.destination &&
            block.item
        );
    };
    
    const handleDateChange = (index: number, raw: string) => {
        const value = raw.replace(/\D/g, '').slice(0, 4);
        updateBlock(index, 'date', value);
    };

    const isValidSimpleDate = (v: string): boolean => {
        // 4桁の数字でなければNG
        if (!/^\d{4}$/.test(v)) return false;
    
        const month = parseInt(v.slice(0, 2), 10);
        const day   = parseInt(v.slice(2, 4), 10);
    
        if (month < 1 || month > 12) return false;
        if (day   < 1 || day   > 31) return false;
    
        return true;
    };

    const formattedDate = (v: string)=> 
        v.length === 4
            ? `${parseInt(v.slice(0, 2))}/${parseInt(v.slice(2, 4))}`
            : v;
  
    const handleSubmit = async () => {
        for (let i = 0; i < activeCount; i++) {
            const block = blocks[i];

            if (i === 0) {
                if (!isBlockValid(block)) {
                    alert('入力1の必須項目を入力してください');
                    return;
                }
            }

            if (i > 0 && !isBlockFilled(block)) {
                continue;
            }

            if (!isBlockValid(block)) {
                alert(`入力${i + 1}の必須項目を入力してください`);
                return;
            }

            if (!isValidSimpleDate(block.date)) {
                alert(`入力${i + 1}の日付が正しくありません(MMDD形式)`);
                return;
            }
        }
  
        const formatted = blocks
            .slice(0, activeCount)
            .filter(block => isBlockFilled(block))
            .map(block => 
                `【${block.destination}】
日付：${formattedDate(block.date)}
便：${block.bin}
物・数量：${block.item}
サイズ：${block.size || 'undefined'}
伝票番号：${block.slipNo || 'undefined'}
`)
        .join('\n');

        try {
            await addDoc(collection(db, 'memoMessages'), {
                content: formatted,
                createdAt: serverTimestamp(),
                createdByUid: user.uid,
                createdByName: user.name,
            });
            
            onClose();
        } catch (err) {
            console.error(err);
            alert('送信に失敗しました');
        }
    };

    const handleAddBlock = () => {
        if (activeCount >= 6) return;

        // const newIndex = activeCount;

        setBlocks(prev => [...prev, { ...emptyBlock} ]);
        setActiveCount(prev => prev + 1);

        // setTimeout(() => {
        //     dateRefs.current[newIndex]?.focus();
        // }, 1000);
    };

    return (
        <div className='structuredForm'>
            <div
                className='customerRow'
                ref={containerRef}    
            >
                {blocks.slice(0, activeCount).map((block, index) => (
                    <CustomerForm
                        key={index}
                        title={`入力${index + 1}`}
                        required={index === 0}
                        inputRef={(el: HTMLInputElement | null) => {
                            if (index === 0) {
                                firstDateRef.current = el;
                            }
                            dateRefs.current[index] = el;
                        }}
                        {...block}
                        onDate={v => handleDateChange(index, v)}
                        onBin={v => updateBlock(index, 'bin', v)}
                        onDestination={v => updateBlock(index, 'destination', v)}
                        onItem={v => updateBlock(index, 'item', v)}
                        onSize={v => updateBlock(index, 'size', v)}
                        onSlip={v => updateBlock(index, 'slipNo', v)}
                    />
                ))}
            </div>
            <div className='btnRow'>
                <div className='blockControl'>
                    <button onClick={onClose}>閉じる</button>
                    {activeCount < 6 && (
                        <button
                            onClick={handleAddBlock}
                        >
                            +枠追加
                        </button>
                    )}
                    {activeCount > 2 && (
                        <button
                            onClick={() => {
                                setBlocks(prev => prev.slice(0, -1));
                                setActiveCount(prev => prev - 1);
                            }}
                        >
                            -枠削除
                        </button>
                    )}
                </div>
                <div className='formBtns'>        
                    <button onClick={handleSubmit}>送信</button>
                </div>
            </div>
        </div>
    );
};
