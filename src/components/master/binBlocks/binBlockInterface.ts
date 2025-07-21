import { ShipmentData } from '../../../data/binData/shipmentTableInterface';
import { HeaderTabProps } from '../header/headerInterface';

type addCountFlag = HeaderTabProps['addCountFlag'];

export interface BinBlockProps {
    row: ShipmentData;
    onChange: (id: number, field: 'today' | 'tomorrow', delta: number) => void;
    onCheckboxToggle: (id: number, key: 'isLargeDrumToday' | 'isLargeDrumTomorrow') => void;
    onColorChange: (id: number) => void;
    addCountFlag: addCountFlag;
}