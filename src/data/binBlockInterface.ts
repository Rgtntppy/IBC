import { ShipmentData } from "./initialData";

export interface BinBlockProps {
    row: ShipmentData;
    onChange: (id: number, field: 'today' | 'tomorrow', delta: number) => void;
}