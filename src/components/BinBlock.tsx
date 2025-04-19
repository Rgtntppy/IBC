import { BinBlockProps } from "../data/binBlockInterface";

export const BinBlock: React.FC<BinBlockProps> = ({ row, onChange }) => (
    <div className={`binBlock ${row.highlight ? `highlight-${row.highlight}` : ''}`}>
        <div className={`binName ${row.highlight ? `highlight-${row.highlight}` : ''}`}>{row.bin}</div>
        <div className="todayCells">{row.today}</div>
        <div className="controlButtonCells">
            <button className="countUpButton" onClick={() => onChange(row.id, 'today', 1)}>▲</button>
            <button className="countDownButton" onClick={() => onChange(row.id, 'today', -1)}>▼</button>
        </div>

        <div className="nextDayCells">{row.tomorrow}</div>
        <div className="controlButtonCells">
            <button className="countUpButton" onClick={() => onChange(row.id, 'tomorrow', 1)}>▲</button>
            <button className="countDownButton" onClick={() => onChange(row.id, 'tomorrow', -1)}>▼</button>
        </div>
    </div>
);