import './binBlocks.scss';
import { BinBlockProps } from './binBlockInterface';
import { BinDayBlock } from './binDayBlocks/BinDayBlock';

export const BinBlock: React.FC<BinBlockProps> = ({ 
    row,
    onChange,
    onSubCountChange,
    onCheckboxToggle,
    onColorChange,
    addCountFlag,
    shortDate,
    shortNextDate,
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
                label={`当日分\n(${shortDate})`}
                className={`todayCells ${row.highlight ? `highlight-${row.highlight}` : ''}`}
                count={row.today ?? 0}
                rightClickCount={row.arrangedTodaysItem ?? 0}
                alertborder={row.alertborder}
                showCheckbox={true}
                checked={row.isLargeDrumToday}
                checkboxLabel='大ドラム'
                onIncrement={() => onChange(row.id, '当日分', 1)}
                onDecrement={() => onChange(row.id, '当日分', -1)}
                onSubIncrement={() => onSubCountChange(row.id, '当日分手配品', 1)}
                onSubDecrement={() => onSubCountChange(row.id, '当日分手配品', -1)}
                onCheckboxToggle={() => onCheckboxToggle(row.id, 'isLargeDrumToday')}
                addCountFlag={addCountFlag}
            />

            <BinDayBlock
                label={`翌日分\n(${shortNextDate})`}
                className='nextDayCells'
                count={row.tomorrow ?? 0}
                rightClickCount={row.arrangedTomorrowsItem ?? 0}
                alertborder={row.alertborder}
                showCheckbox={true}
                checked={row.isLargeDrumTomorrow ?? false}
                checkboxLabel='大ドラム'
                onIncrement={() => onChange(row.id, '翌日分', 1)}
                onDecrement={() => onChange(row.id, '翌日分', -1)}
                onSubIncrement={() => onSubCountChange(row.id, '翌日分手配品', 1)}
                onSubDecrement={() => onSubCountChange(row.id, '翌日分手配品', -1)}
                onCheckboxToggle={() => onCheckboxToggle(row.id, 'isLargeDrumTomorrow')}
                addCountFlag={addCountFlag}
            />
        </div>
    );
};