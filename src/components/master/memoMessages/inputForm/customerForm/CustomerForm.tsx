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

    const  binInputRef = useRef<HTMLInputElement>(null);

    const handleDate = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const v = e.target.value.replace(/\D/g,'').slice(0,4);
        onDate(v);

        if (v.length === 4) {
            binInputRef.current?.focus();
        }
    };

    const firstFields = [
        {
            label: '日付',
            value: date,
            placeholder: 'MMDD',
            maxLength: 4,
            onChange: handleDate,
            ref: inputRef,
        },{
            label: '便',
            value: bin,
            placeholder: 'AM99',
            maxLength: 10,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                onBin(e.target.value),
            ref: binInputRef,
        },{
            label: '行先',
            value: destination,
            placeholder: '○○産業××(営)',
            maxLength: 50,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                onDestination(e.target.value),
        },
    ];

    const lastFields = [
        {
            label: 'サイズ',
            value: size,
            placeholder: '3-5',
            maxLength: 10,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                onSize(e.target.value),
        },{
            label: '伝票番号',
            value: slipNo,
            placeholder: '000-00000',
            maxLength: 50,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                onSlip(e.target.value),
        },
    ];

    return(
        <div className='customerBlock'>
            <div className='titleLabel'>
                <h4>
                    {title}{required && ' *'}
                </h4>
                <p className='cautionMessage'>
                    {required && '*は必須項目です'}
                </p>
            </div>

            {firstFields.map((field, index) => (
                <label key={index} className='itemField'>
                    <span>
                        {field.label}{required && ' *'}
                    </span>
                    <input
                        ref={field.ref as any}
                        className='customerInput'
                        value={field.value}
                        onChange={field.onChange}
                        placeholder={field.placeholder}
                        maxLength={field.maxLength}
                    />
                </label>
            ))}

            <label className='itemField'>
                <span>
                    物・数量{required && ' *'}
                </span>
                <textarea
                    className='customerTextarea'
                    value={item}
                    onChange={e=>onItem(e.target.value)}
                    placeholder='CV3.5x3c300m'
                    maxLength={300}
                />
            </label>

            {lastFields.map((field, index) => (
                <label key={index} className='itemField'>
                    <span>
                        {field.label}
                    </span>
                    <input
                        className='customerInput'
                        value={field.value}
                        onChange={field.onChange}
                        placeholder={field.placeholder}
                        maxLength={field.maxLength}
                    />
                </label>
            ))}
        </div>
    );
};