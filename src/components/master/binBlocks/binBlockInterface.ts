import { ShipmentData } from '../../../data/binData/shipmentTableInterface';
import { HeaderTabProps } from '../header/headerInterface';

type addCountFlag = HeaderTabProps['addCountFlag'];

export interface BinBlockProps {
    row: ShipmentData;
    onChange: (id: number, field: string, delta: number, date?: string) => void;
    onSubCountChange: (id: number, field: '当日分手配品' | '翌日分手配品', delta: number, date?: string) => void;
    onCheckboxToggle: (id: number, key: 'isLargeDrumToday' | 'isLargeDrumTomorrow') => void;
    onColorChange: (id: number) => void;
    addCountFlag: addCountFlag;
    shortDate: string;
    shortNextDate: string;
}