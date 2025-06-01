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
                            onChange={() => {   
                                onCheckboxToggle();
                            }}
                        />
                        {checkboxLabel}
                    </label>
                )}
            </div>
            <div className='controlButtonCells'>
                <button
                    className='countUpButton'
                    onClick={() => {
                            onIncrement();
                    }}
                >
                    ▲
                </button>
                <button
                    className='countDownButton'
                    onClick={() => {
                        onDecrement();
                    }}
                >
                    ▼
                </button>
            </div>
        </div>
    )
}