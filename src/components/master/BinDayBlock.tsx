import React from "react";
import { BinDayBlockProps } from "../../data/binDayBlockInterface";

export const BinDayBlock: React.FC<BinDayBlockProps> = ({
    label,
    className,
    count,
    limit,
    showCheckbox = false,
    checkboxLabel = "",
    onIncrement,
    onDecrement,
}) => {
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
                    <input type="checkbox" />
                    {checkboxLabel}
                </label>
            )}
        </div>
        <div className="controlButtonCells">
            <button className="countUpButton" onClick={onIncrement}>▲</button>
            <button className="countDownButton" onClick={onDecrement}>▼</button>
        </div>
        </>
    )
}