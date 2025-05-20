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
    role,
}) => {
    const isAdmin = role === 'admin';

    return (
        <>
            <div className={`dayCells ${className || ""} ${count > limit ? 'alert' : ''}`}>
                <p className="label">{label}</p>
                <div
                    className="count"
                    style={{ visibility: count === 0 ? 'hidden' : 'visible'}}
                >
                    {count}
                </div>
                {showCheckbox && (
                    <label className="checkboxLabel">
                        <input 
                            type="checkbox"
                            checked={checked}
                            onChange={() => onCheckboxToggle()}
                            disabled={!isAdmin}
                        />
                        {checkboxLabel}
                    </label>
                )}
            </div>
            <div className="controlButtonCells">
                <button
                    className="countUpButton"
                    onClick={isAdmin ? onIncrement: undefined}
                    disabled={!isAdmin}
                >
                    ▲
                </button>
                <button
                    className="countDownButton"
                    onClick={isAdmin ? onDecrement: undefined}
                    disabled={!isAdmin}
                >
                    ▼
                </button>
            </div>
        </>
    )
}