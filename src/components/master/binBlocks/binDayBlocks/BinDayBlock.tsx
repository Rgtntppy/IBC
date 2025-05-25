import React from "react";
import './binDayBlocks.scss';
import { BinDayBlockProps } from "./binDayBlockInterface";

export const BinDayBlock: React.FC<BinDayBlockProps> = ({
    label,
    className,
    count,
    limit,
    showCheckbox = false,
    checked = false,
    checkboxLabel = "",
    onIncrement,
    onDecrement,
    onCheckboxToggle,
    authority,
}) => {

    return (
        <div className='binDayCells'>
            <div className={`dayCells ${className || ''} ${count > limit ? 'alert' : ''}`}>
                <p className='label'>{label}</p>
                <div
                    className='count'
                    style={{ visibility: count === 0 ? 'hidden' : 'visible'}}
                >
                    {count}
                </div>
                {showCheckbox && (
                    <label className='checkboxLabel'>
                        <input 
                            type='checkbox'
                            checked={checked}
                            onChange={() => onCheckboxToggle()}
                            disabled={authority < 5}
                        />
                        {checkboxLabel}
                    </label>
                )}
            </div>
            <div className='controlButtonCells'>
                <button
                    className='countUpButton'
                    onClick={authority >= 5 ? onIncrement: undefined}
                    disabled={authority < 5}
                >
                    ▲
                </button>
                <button
                    className='countDownButton'
                    onClick={authority >= 5 ? onDecrement: undefined}
                    disabled={authority < 5}
                >
                    ▼
                </button>
            </div>
        </div>
    )
}