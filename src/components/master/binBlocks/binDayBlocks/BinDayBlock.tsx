import React from "react";
import './binDayBlocks.scss';
import { BinDayBlockProps } from "./binDayBlockInterface";

export const BinDayBlock: React.FC<BinDayBlockProps> = ({
    label,
    className,
    count,
    alertborder,
    showCheckbox = false,
    checked = false,
    checkboxLabel = "",
    onIncrement,
    onDecrement,
    onCheckboxToggle,
    addCountFlag,
}) => {

    return (
        <div className='binDayCells'>
            <div className={`dayCells ${className || ''} ${count > alertborder ? 'alert' : ''}`}>
                <p className='label'>{label}</p>
                <div
                    className='count noto-serif-jp'
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
                    disabled={!addCountFlag}
                >
                    ▲
                </button>
                <button
                    className='countDownButton'
                    onClick={() => {
                        onDecrement();
                    }}
                    disabled={!addCountFlag}
                >
                    ▼
                </button>
            </div>
        </div>
    )
}