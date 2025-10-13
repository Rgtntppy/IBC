import './binDayBlocks.scss';
import { BinDayBlockProps } from "./binDayBlockInterface";

export const BinDayBlock: React.FC<BinDayBlockProps> = ({
    label,
    className,
    count,
    rightClickCount,
    alertborder,
    showCheckbox = false,
    checked = false,
    checkboxLabel = '',
    onIncrement,
    onDecrement,
    onSubIncrement,
    onSubDecrement,
    onCheckboxToggle,
    addCountFlag,
}) => {
    const isHidden = 
        (count ?? 0) === 0 &&
        (rightClickCount ?? 0) === 0;

    return (
        <div className='binDayCells'>
            <div
                className={`dayCells ${className || ''} ${count + rightClickCount > alertborder ? 'alert' : ''}`}
            >
                <p className='label'>{label}</p>
                {!isHidden && (
                    <div
                        className='count noto-serif-jp'
                        >
                        {count}{rightClickCount > 0 ? `+${rightClickCount}` : ''}
                    </div>
                )}
                {showCheckbox && (
                    <label className='checkboxLabel'>
                        <input 
                            type='checkbox'
                            checked={checked}
                            onChange={() => {   
                                onCheckboxToggle();
                            }}
                        />
                        <p
                            className='checkboxLabelText'
                        >
                            {checkboxLabel}
                        </p>
                    </label>
                )}
            </div>
            <div className='controlButtonCells'>
                <button
                    className='countUpButton'
                    onClick={() => {
                            onIncrement();
                    }}
                    onContextMenu={(e) => {
                        e.preventDefault();
                        onSubIncrement();
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
                    onContextMenu={(e) => {
                        e.preventDefault();
                        onSubDecrement();
                    }}
                    disabled={!addCountFlag}
                >
                    ▼
                </button>
            </div>
        </div>
    )
}