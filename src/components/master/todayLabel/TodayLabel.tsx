import './todayLabel.scss';
import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { saveTodayLabelData } from '../../../firebase/todayLabelData/saveTodayLabelData';
import { subscribeTodayLabelData } from '../../../firebase/todayLabelData/subscribeTodayLabelData';
import { TodayLabelProps } from './todayLabelInterface';
import { DayErrorPopup } from './dayErrorPopups/DayErrorPopup';

export const TodayLabel: React.FC<TodayLabelProps> = ({
    currentDate,
    setCurrentDate,
    displayDate,
    setDisplayDate,
    isDateConfirmed,
    setIsDateConfirmed,
    authority,
}) => {
    const [yearInput, setYearInput] = useState('');
    const [monthInput, setMonthInput] = useState('');
    const [dayInput, setDayInput] = useState('');
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const yearInputRef = useRef<HTMLInputElement>(null);
    const monthInputRef = useRef<HTMLInputElement>(null);
    const dayInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const unsubscribe = subscribeTodayLabelData((data) => {
            if (!isDateConfirmed && authority > 7) return;

            setCurrentDate(data.currentDate);
            setDisplayDate(data.displayDate);
            setIsDateConfirmed(true);

            const parsed = dayjs(data.currentDate);
            setYearInput(parsed.format('YYYY'));
            setMonthInput(parsed.format('MM'));
            setDayInput(parsed.format('DD'));
        });
        
        return () => unsubscribe();
    }, []);
    
    const handleDateConfirm = () => {
        if (yearInput.length === 4 && monthInput.length === 2 && dayInput.length === 2) {
            const formattedDisplay = `${yearInput}年${monthInput}月${dayInput}日分`;
            const formatted = `${yearInput}/${monthInput}/${dayInput}`;
            setDisplayDate(formattedDisplay);
            setCurrentDate(formatted);
            setIsDateConfirmed(true);

            saveTodayLabelData({
                currentDate: formatted,
                displayDate: formattedDisplay,
            });            
        }
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        setYearInput(value);

        if (value.length === 4) {
            monthInputRef.current?.focus();
        }
    };

    const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        setMonthInput(value);

        if (value.length === 2) {
            const mm = parseInt(value, 10);
            
            if (mm < 1 || mm > 12) {
                setErrorMessage('月は01〜12の範囲で入力してください。');
                setShowError(true);
                return;
            }

            dayInputRef.current?.focus();
        }
    };

    const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        setDayInput(value);

        if (value.length ===2) {
            const dd = parseInt(value, 10);

            if (dd < 1 || dd > 31) {
                setErrorMessage('日は01〜31の範囲で入力したください。');
                setShowError(true);
                return;    
            }

            // formatAndSetDate(yearInput, monthInput, value);
        }
    };

    const handleInputBlur = () => {
        setTimeout(() => {
            const isYearFocused = document.activeElement === yearInputRef.current;
            const isMonthFocused = document.activeElement === monthInputRef.current;
            const isDayFocused = document.activeElement === dayInputRef.current;

            if (!isYearFocused && !isMonthFocused && !isDayFocused) {
                if (yearInput.length === 4 && monthInput.length === 2 && dayInput.length === 2) {
                    const valid = dayjs(`${yearInput}/${monthInput}/${dayInput}`, 'yyyy/MM/DD', true).isValid();
                    if (!valid) {
                        setErrorMessage('存在しない日付です');
                        setShowError(true);
                        return;
                    }
                    handleDateConfirm();
                }
            }
        }, 0);
    };

    return (
        <div className='todayLabel'>
            {!isDateConfirmed && authority >= 5 ? (
                <div className='todayDate'>
                    <input
                        className='yearInput noto-serif-jp'
                        type='text'
                        value={yearInput}
                        onChange={handleYearChange}
                        placeholder='YYYY年'
                        maxLength={4}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleDateConfirm();
                        }}
                        onBlur={handleInputBlur}
                        ref={yearInputRef}
                    />
                    <input
                        className='monthInput noto-serif-jp'
                        type='text'
                        value={monthInput}
                        onChange={handleMonthChange}
                        placeholder='mm月'
                        maxLength={2}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleDateConfirm();
                        }}
                        onBlur={handleInputBlur}
                        ref={monthInputRef}
                    />
                    <input
                        className='dayInput noto-serif-jp'
                        type='text'
                        value={dayInput}
                        onChange={handleDayChange}
                        placeholder='dd日'
                        maxLength={2}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleDateConfirm();
                        }}
                        onBlur={handleInputBlur}
                        ref={dayInputRef}
                    />
                </div>
            ) : (
                <p
                    tabIndex={authority < 5 ? -1 : 0}
                    className={`daysText noto-serif-jp ${authority < 5 ? 'disabled' : ''}`}
                    onClick={() => {
                        if (authority < 8) return;
                        const parsed = dayjs(currentDate);
                        setYearInput(parsed.format('YYYY'));
                        setMonthInput(parsed.format('MM')); 
                        setDayInput(parsed.format('DD'));
                        setIsDateConfirmed(false);

                        setTimeout(() => {
                        dayInputRef.current?.focus();
                        }, 0);
                    }}
                >
                    {displayDate}
                </p>
            )}
            {showError && (
                <DayErrorPopup
                    setShowError={setShowError}
                    errorMessage={errorMessage}
                />
            )}
        </div>
    )
}