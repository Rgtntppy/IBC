import './onlytoday.scss';
import { OnlytodayProps } from './onlytodayInterface';
import { BinDayBlock } from '../binDayBlocks/BinDayBlock';

export const Onlytoday: React.FC<OnlytodayProps> = ({
    id,
    bin,
    today,
    isLargeDrumToday,
    limit,
    highlight,
    onChange,
    onCheckboxToggle,
}) => {
    return (
        <div className='onlytodayBinBlock'>
            <div className='binName'>
                {bin}
            </div>
            <BinDayBlock
                label="当日分"
                className={`todayCells ${highlight ? `highlight-${highlight}` : ''}`}
                count={today}
                limit={limit}
                showCheckbox={true}
                checked={isLargeDrumToday}
                checkboxLabel="大ドラム"
                onIncrement={() => onChange(id, 'today', 1)}
                onDecrement={() => onChange(id, 'today', -1)}
                onCheckboxToggle={() => onCheckboxToggle(id, 'isLargeDrumToday')}
            />
        </div>
    );
};