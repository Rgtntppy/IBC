import './onlytoday.scss';
import { useState, useEffect, useRef } from 'react';
import { OnlytodayProps } from './onlytodayInterface';
import { BinDayBlock } from '../binDayBlocks/BinDayBlock';
import { ConfirmDialog } from '../../popUp/confirmDialog/ConfirmDialog';

export const Onlytoday: React.FC<OnlytodayProps> = ({
    id,
    bin,
    today,
    arrangedTodaysItem,
    isLargeDrumToday,
    alertborder,
    highlight,
    onChange,
    onSubChangeTentative,
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
                        maxLength={9}
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
                        style={{
                            fontSize:
                                binName.length <= 2 ? '24px' :
                                binName.length <= 4 ? '20px' :
                                binName.length <= 6 ? '16px' :
                                '12px',
                                whiteSpace: 'pre-line',
                        }}
                        onClick={() => {
                            if (userAuthority > 4) {
                            setIsEditing(true);
                            setTimeout(() => inputRef.current?.focus(), 0);
                            }
                        }}
                    >
                        {(() => {
                            const name = (binName ?? '').trim();
                            const len = binName.length;

                            if (len === 0) return '';
                            if (len <= 2) return name;
                            if (len <= 6) {
                                const mid = Math.ceil(len / 2);
                                return `${binName.slice(0, mid)}\n${binName.slice(mid)}`;
                            }

                            //7文字以上 → 3段構成
                            const part = Math.ceil(len / 3);
                            const first = binName.slice(0, part);
                            const second = binName.slice(part, part*2);
                            const third = binName.slice(part * 2);
                            return `${first}\n${second}\n${third}`;
                        })()}
                    </p>
                )}
            </div>
            <BinDayBlock
                label=''
                className={`todayCells ${highlight ? `highlight-${highlight}` : ''}`}
                count={today ?? 0}
                rightClickCount={arrangedTodaysItem ?? 0}
                alertborder={alertborder}
                showCheckbox={true}
                checked={isLargeDrumToday}
                checkboxLabel='大ドラム'
                onIncrement={() => onChange(id, 'today', 1)}
                onDecrement={() => onChange(id, 'today', -1)}
                onSubIncrement={() => onSubChangeTentative(id, '当日分手配品', 1)}
                onSubDecrement={() => onSubChangeTentative(id, '当日分手配品', -1)}
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