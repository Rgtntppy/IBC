import { BinBlockProps } from "../../data/binBlockInterface";
import { BinDayBlock } from "./BinDayBlock";

export const BinBlock: React.FC<BinBlockProps> = ({ 
    row,
    onChange,
    onCheckboxToggle,
    className 
}) => (
    <div className="binBlock">
        <div className={`binName ${row.highlight ? `highlight-${row.highlight}` : ''}`}>{row.bin}</div>
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
        />

        <BinDayBlock
            label="翌日分"
            className="nextDayCells"
            count={row.tomorrow}
            limit={row.limit}
            showCheckbox={true}
            checked={row.isLargeDrumTomorrow}
            checkboxLabel="大ドラム"
            onIncrement={() => onChange(row.id, 'tomorrow', 1)}
            onDecrement={() => onChange(row.id, 'tomorrow', -1)}
            onCheckboxToggle={() => onCheckboxToggle(row.id, 'isLargeDrumTomorrow')}
        />
    </div>
);