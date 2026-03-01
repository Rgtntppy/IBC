import React, { useEffect, useRef } from 'react';
import './customerForm.scss';
import { CustomerFormProps } from './customerFormInterface';

export const CustomerForm: React.FC<CustomerFormProps> = ({
    title,
    required,
    inputRef,
    date,bin,destination,item,size,slipNo,
    onDate,onBin,onDestination,onItem,onSize,onSlip
}) => {

    const dateInputRef = useRef<HTMLInputElement>(null);
    const  binInputRef = useRef<HTMLInputElement>(null);

    const handleDate = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const v = e.target.value.replace(/\D/g,'').slice(0,4);

        onDate(v);

        if (v.length === 4) {
            binInputRef.current?.focus();
        }
    };

    return(
        <div className='customerBlock'>
            <div className='titleLabel'>
                <h4>{title}{required && ' *'}</h4>
                <p className='cautionMessage'>{required && '*は必須項目です'}</p>
            </div>
            <label>
                <span>
                    日付{required && ' *'}
                </span>
                <input
                    ref={inputRef}
                    className='customerInput'
                    value={date}
                    onChange={handleDate}
                    placeholder='MMDD'
                    maxLength={4}
                />
            </label>
        
            <label>
                <span>
                    便{required && ' *'}
                </span>
                <input
                    ref={binInputRef}
                    className='customerInput'
                    value={bin}
                    onChange={e=>onBin(e.target.value)}
                    placeholder='AM99'
                    maxLength={10}
                />
            </label>
        
            <label>
                <span>
                    行先{required && ' *'}
                </span>
                <input
                    className='customerInput'
                    value={destination}
                    onChange={e=>onDestination(e.target.value)}
                    placeholder='○○産業××(営)'
                    maxLength={50}    
                />
            </label>
        
            <label>
                <span>
                    物・数量{required && ' *'}
                </span>
                <input
                    className='customerInput'
                    value={item}
                    onChange={e=>onItem(e.target.value)}
                    placeholder='CV3.5x3c300m'
                    maxLength={300}
                />
            </label>

        <label>
            <span>
                サイズ
            </span>
            <input
                className='customerInput'
                value={size}
                onChange={e=>onSize(e.target.value)}
                placeholder='3-5'
                maxLength={10}
            />
        </label>

        <label>
            <span>
                伝票番号
            </span>
            <input
                className='customerInput'
                value={slipNo}
                onChange={e=>onSlip(e.target.value)}
                placeholder='000-00000'
                maxLength={50}
            />
        </label>

        </div>
    );
};