import './onlytoday.scss';
import { useState, useEffect, useRef } from 'react';
import { OnlytodayProps } from './onlytodayInterface';
import { BinDayBlock } from '../binDayBlocks/BinDayBlock';
import { saveOnlytodayData } from '../../../../firebase/onlytodaysData/saveOnlytodaysData';
import { loadOnlytodayData } from '../../../../firebase/onlytodaysData/loadOnlytodaysData';
import { OnlytodaysData } from '../../../../firebase/onlytodaysData/onlytodaysDataInterface';

export const Onlytoday: React.FC<OnlytodayProps> = ({
    id,
    bin,
    today: initialToday,
    isLargeDrumToday: initialIsLargeDrumToday,
    limit,
    highlight,
    onChange,
    onCheckboxToggle,
    role,
    authority,
}) => {
    const [binName, setBinName] = useState(bin);
    const [today, setToday] = useState(initialToday);
    const [isLargeDrumToday, setIsLargeDrumToday] = useState(initialIsLargeDrumToday);

    const [isEditing, setIsEditing] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await loadOnlytodayData();
            if (!data) return;
            const matched = data.find((item: OnlytodaysData) => item.id === id);
            if (matched) {
                setBinName(matched.bin);
                setToday(matched.today);
                setIsLargeDrumToday(matched.isLargeDrumToday);
            }
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        const saveData = async () => {
            const saveObj: OnlytodaysData = {
                id,
                bin: binName,
                today,
                isLargeDrumToday,
            };
            await saveOnlytodayData([saveObj]);
        };
        saveData();
    }, [binName, today, isLargeDrumToday]);

    const handleBlur = () => {
        setIsEditing(false);
    };
    
    return (
        <div className='onlytodayBinBlock'>
            <div className='binNameWrapper'>
                {isEditing ? (
                    <input
                        ref={inputRef}
                        type='text'
                        className='binNameInput'
                        value={binName}
                        maxLength={4}
                        onChange={(e) => setBinName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.currentTarget.blur();
                            } 
                        }}
                        onBlur={handleBlur}
                        autoFocus
                    />
                ) : (
                    <p
                        className='binNameText'
                        onClick={() => {
                            setIsEditing(true);
                            setTimeout(() => inputRef.current?.focus(), 0);
                        }}
                    >
                        {binName.length >= 3
                            ? `${binName.slice(0, 2)}\n${binName.slice(2)}`
                        : binName
                        }
                    </p>
                )}
            </div>
            <BinDayBlock
                role={role}
                authority={authority}
                label="当日分"
                className={`todayCells ${highlight ? `highlight-${highlight}` : ''}`}
                count={today}
                limit={limit}
                showCheckbox={true}
                checked={isLargeDrumToday}
                checkboxLabel="大ドラム"
                onIncrement={() => onChange(id, 'today', 1)}
                onDecrement={() => onChange(id, 'today', -1)}
                onCheckboxToggle={() => onCheckboxToggle(id, 'isLargeDrumToday')}
            />
        </div>
    );
};