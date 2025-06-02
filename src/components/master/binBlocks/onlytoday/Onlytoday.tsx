import './onlytoday.scss';
import { useState, useEffect, useRef } from 'react';
import { OnlytodayProps } from './onlytodayInterface';
import { BinDayBlock } from '../binDayBlocks/BinDayBlock';

export const Onlytoday: React.FC<OnlytodayProps> = ({
    id,
    bin,
    today,
    isLargeDrumToday,
    limit,
    highlight,
    onChange,
    onCheckboxToggle,
    onNameChange,
}) => {
    const [binName, setBinName] = useState(bin);
    const [isEditing, setIsEditing] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setBinName(bin);
    }, [bin]);

    const handleBlur = () => {
        setIsEditing(false);
        onNameChange(id, binName);
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