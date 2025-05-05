import './todayLabel.scss';
import { TodayLabelProps } from './todayLabelInterfase';
import React, { useRef, useState } from "react";
import dayjs from "dayjs";

export const TodayLabel: React.FC<TodayLabelProps> = ({
    currentDate,
    setCurrentDate,
    displayDate,
    setDisplayDate,
    isDateConfirmed,
    setIsDateConfirmed,
}) => {
    const [yearInput, setYearInput] = useState('');
    const [monthDayInput, setMonthDayInput] = useState('');
  
    const yearInputRef = useRef<HTMLInputElement>(null);
    const monthDayInputRef = useRef<HTMLInputElement>(null);
    
    const formatAndSetDate = (year: string, mmdd: string) => {
        if (year.length === 4 && mmdd.length === 4) {
            const formatted = `${year}/${mmdd.slice(0, 2)}/${mmdd.slice(2, 4)}`;
            const formattedDisplay = `${year}年${mmdd.slice(0, 2)}月${mmdd.slice(2, 4)}日分`;
            setCurrentDate(formatted);
            setDisplayDate(formattedDisplay);
        }
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 4);
        setYearInput(value);
        formatAndSetDate(value, monthDayInput);
    };

    const handleMonthDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 4);
        setMonthDayInput(value);
        formatAndSetDate(yearInput, value);
    };

    const handleDateConfirm = () => {
        if (yearInput.length === 4 && monthDayInput.length === 4) {
            const formattedDisplay = `${yearInput}年${monthDayInput.slice(0, 2)}月${monthDayInput.slice(2, 4)}日分`;
            setDisplayDate(formattedDisplay);
            setIsDateConfirmed(true);
        }
    }

    const handleInputBlur = () => {
        setTimeout(() => {
            const isYearFocused = document.activeElement === yearInputRef.current;
            const isMonthDayFocused = document.activeElement === monthDayInputRef.current;

            if (!isYearFocused && !isMonthDayFocused) {
            handleDateConfirm();
            }
        }, 0);
    };

    return (
        <div className='todayLabel'>
            {!isDateConfirmed ? (
                <div className='todayDate'>
                <input
                    className='yearInput'
                    type='text'
                    value={yearInput}
                    onChange={handleYearChange}
                    placeholder='YYYY'
                    onKeyDown={(e) => {
                    if (e.key === 'Enter') handleDateConfirm();
                    }}
                    onBlur={handleInputBlur}
                    ref={yearInputRef}
                />
                <input
                    className='monthDayInput'
                    type='text'
                    value={monthDayInput}
                    onChange={handleMonthDayChange}
                    placeholder='mmdd'
                    onKeyDown={(e) => {
                    if (e.key === 'Enter') handleDateConfirm();
                    }}
                    onBlur={handleInputBlur}
                    ref={monthDayInputRef}
                />
                </div>
            ) : (
                <p
                className='daysText'
                onClick={() => {
                    const parsed = dayjs(currentDate);
                    setYearInput(parsed.format('YYYY'));
                    setMonthDayInput(parsed.format('MMDD')); 
                    setIsDateConfirmed(false);

                    setTimeout(() => {
                    monthDayInputRef.current?.focus();
                    }, 0);
                }}
                >
                {displayDate}
                </p>
            )}
        </div>
    )
}