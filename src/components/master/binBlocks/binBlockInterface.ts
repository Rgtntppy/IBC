import { ShipmentData } from '../../../data/binData/shipmentTableInterface';
import { HeaderTabProps } from '../header/headerInterface';

type addCountFlag = HeaderTabProps['addCountFlag'];

export interface BinBlockProps {
    row: ShipmentData;
    onChange: (id: number, field: '当日分' | '翌日分', delta: number) => void;
    onSubCountChange: (id: number, field: '当日分手配品' | '翌日分手配品', delta: number) => void;
    onCheckboxToggle: (id: number, key: 'isLargeDrumToday' | 'isLargeDrumTomorrow') => void;
    onColorChange: (id: number) => void;
    addCountFlag: addCountFlag;
}