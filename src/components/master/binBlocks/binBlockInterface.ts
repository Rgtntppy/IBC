import { ShipmentData } from "../shipmentTableInterface";

export interface BinBlockProps {
    row: ShipmentData;
    onChange: (id: number, field: 'today' | 'tomorrow', delta: number) => void;
    onCheckboxToggle: (id: number, key: 'isLargeDrumToday' | 'isLargeDrumTomorrow') => void;
    role: string;
    authority: number;
}