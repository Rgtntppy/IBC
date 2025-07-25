import './binBlocks.scss';
import { BinBlockProps } from "./binBlockInterface";
import { BinDayBlock } from "./binDayBlocks/BinDayBlock";

export const BinBlock: React.FC<BinBlockProps> = ({ 
    row,
    onChange,
    onCheckboxToggle,
    onColorChange,
    addCountFlag,
}) => {
    return (
        <div className='binBlock'>
            <div
                className={`binName noto-serif-jp ${
                    row.highlight
                    ? `highlight-${row.highlight}` : ''
                } alert-${row.binAlert}`}
                onContextMenu={(e) => {
                    e.preventDefault();
                    onColorChange(row.id);
                }}
            >
                {row.bin.length >= 4
                    ? <>
                        {row.bin.slice(0, 2)}
                        <br/>
                        {row.bin.slice(2)}
                    </>
                    : row.bin
                }
            </div>
            <BinDayBlock
                label="当日分"
                className={`todayCells ${row.highlight ? `highlight-${row.highlight}` : ''}`}
                count={row.today}
                limit={row.limit}
                showCheckbox={true}
                checked={row.isLargeDrumToday}
                checkboxLabel="大ドラム"
                onIncrement={() => onChange(row.id, 'today', 1)}
                onDecrement={() => onChange(row.id, 'today', -1)}
                onCheckboxToggle={() => onCheckboxToggle(row.id, 'isLargeDrumToday')}
                addCountFlag={addCountFlag}
            />

            <BinDayBlock
                label="翌日分"
                className="nextDayCells"
                count={row.tomorrow ?? 0}
                limit={row.limit}
                showCheckbox={true}
                checked={row.isLargeDrumTomorrow ?? false}
                checkboxLabel="大ドラム"
                onIncrement={() => onChange(row.id, 'tomorrow', 1)}
                onDecrement={() => onChange(row.id, 'tomorrow', -1)}
                onCheckboxToggle={() => onCheckboxToggle(row.id, 'isLargeDrumTomorrow')}
                addCountFlag={addCountFlag}
            />
        </div>
    );
};