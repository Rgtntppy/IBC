export interface BinDayBlockProps {
    label: string;
    className: string;
    count: number;
    showCheckbox: boolean;
    checkboxLabel?: string;
    onIncrement: () => void;
    onDecrement: () => void;
}