import React from "react";
import { BinDayBlockProps } from "../data/binDayBlockInterface";

export const BinDayBlock: React.FC<BinDayBlockProps> = ({
    label,
    className,
    count,
    showCheckbox = false,
    checkboxLabel = "",
    onIncrement,
    onDecrement,
}) => {
    return (
        <>
        <div className={`dayCells ${className || ""}`}>
            <p className="label">{label}</p>
            <div className="count">{count}</div>
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