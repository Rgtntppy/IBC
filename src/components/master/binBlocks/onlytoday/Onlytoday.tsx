import './onlytoday.scss';
import { useState, useEffect, useRef } from 'react';
import { OnlytodayProps } from './onlytodayInterface';
import { BinDayBlock } from '../binDayBlocks/BinDayBlock';
import { ConfirmDialog } from '../../popUp/confirmDialog/ConfirmDialog';

export const Onlytoday: React.FC<OnlytodayProps> = ({
    id,
    bin,
    today,
    isLargeDrumToday,
    alertborder,
    highlight,
    onChange,
    onCheckboxToggle,
    onNameChange,
    userAuthority,
    addCountFlag,
    onDelete,
}) => {
    const [binName, setBinName] = useState(bin);
    const [isEditing, setIsEditing] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setBinName(bin);
    }, [bin]);

    const handleBlur = () => {
        setIsEditing(false);
        onNameChange(id, binName);
    };

    const handleDeleteClick = () => {
        if (userAuthority < 5) return;

        setIsDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        onDelete(id, bin);
        setIsDialogOpen(false);
    };

    const handleCancelDelete = () => {
        setIsDialogOpen(false);
    };
    
    return (
        <div className='onlytodayBinBlock'>
            <div className='binNameWrapper'>
                {isEditing ? (
                    <input
                        ref={inputRef}
                        type='text'
                        className='binNameInput noto-serif-jp'
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
                        className='binNameText noto-serif-jp'
                        onClick={() => {
                            if (userAuthority > 4) {
                            setIsEditing(true);
                            setTimeout(() => inputRef.current?.focus(), 0);
                            }
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
                label=''
                className={`todayCells ${highlight ? `highlight-${highlight}` : ''}`}
                count={today}
                alertborder={alertborder}
                showCheckbox={true}
                checked={isLargeDrumToday}
                checkboxLabel='大ドラム'
                onIncrement={() => onChange(id, 'today', 1)}
                onDecrement={() => onChange(id, 'today', -1)}
                onCheckboxToggle={() => onCheckboxToggle(id, 'isLargeDrumToday')}
                addCountFlag={addCountFlag}
            />
            <button
                className='deleteButton'
                onClick={handleDeleteClick}
            >
                削除
            </button>

            <ConfirmDialog
                isOpen={isDialogOpen}
                title='削除の確認'
                message={`「 ${bin} 」の内容を削除してもよろしいでしょうか？`}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </div>
    );
};