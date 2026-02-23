import './inputForm.scss';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../../firebase/firebase';
import { useState } from 'react';
import { StructuredMemoFormProps } from './inputFormInterface';
import { CustomerForm } from './customerForm/CustomerForm';

export const StructuredMemoForm:React.FC<StructuredMemoFormProps> = ({ user, onClose }) => {
    const [date, setDate] = useState('');
    const [bin, setBin] = useState('');
    const [destination, setDestination] = useState('');
    const [item, setItem] = useState('');
    const [size, setSize] = useState('');
    const [slipNo, setSlipNo] = useState('');

    const [date2, setDate2] = useState('');
    const [bin2, setBin2] = useState('');
    const [destination2, setDestination2] = useState('');
    const [item2, setItem2] = useState('');
    const [size2, setSize2] = useState('');
    const [slipNo2, setSlipNo2] = useState('');
    
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 4);
      
        if (value === '') {
            setDate('');
            return;
        }

        // 月チェック
        if (value.length >= 2) {
            const month = parseInt(value.slice(0, 2), 10);
            if (month < 1 || month > 12) return;
        }

        // 日チェック（入力途中は許可）
        if (value.length === 4) {
            const day = parseInt(value.slice(2, 4), 10);
            if (day < 1 || day > 31) return;
        }
        
        setDate(value);
    };

    const formattedDate = (v: string)=> 
        v.length === 4
            ? `${parseInt(v.slice(0, 2))}/${parseInt(v.slice(2, 4))}`
            : v;
  
    const handleSubmit = async () => {
        if (!date || !bin || !destination || !item) {
            alert('必須項目を入力してください');
            return;
        }
  
        const formatted =
        `【${destination}】
日付：${formattedDate(date)}
便：${bin}
物・数量：${item}
サイズ：${size || 'undefined'}
伝票番号：${slipNo || 'undefined'}
`
+
(
bin2 || destination2 || item2 || size2 || slipNo2
? `

【${destination2}】
日付：${formattedDate(date2)}
便：${bin2}
物・数量：${item2}
サイズ：${size2 || 'undefined'}
伝票番号：${slipNo2 || 'undefined'}
`
: ''
);

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

  return (
    <div className='structuredForm'>
        <div className='customerRow'>
            <CustomerForm
                title="入力1"
                required
                date={date}
                bin={bin}
                destination={destination}
                item={item}
                size={size}
                slipNo={slipNo}
                onDate={setDate}
                onBin={setBin}
                onDestination={setDestination}
                onItem={setItem}
                onSize={setSize}
                onSlip={setSlipNo}
            />
            <CustomerForm
                title="入力2"
                date={date2}
                bin={bin2}
                destination={destination2}
                item={item2}
                size={size2}
                slipNo={slipNo2}
                onDate={setDate2}
                onBin={setBin2}
                onDestination={setDestination2}
                onItem={setItem2}
                onSize={setSize2}
                onSlip={setSlipNo2}
            />
        </div>
        <div className='formBtns'>        
            <button onClick={handleSubmit}>送信</button>
            <button onClick={onClose}>閉じる</button>
        </div>
    </div>
  );
};
