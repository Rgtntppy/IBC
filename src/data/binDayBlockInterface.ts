export interface BinDayBlockProps {
    label: string;
    className: string;
    count: number;
    limit: number;
    showCheckbox: boolean;
    checkboxLabel?: string;
    onIncrement: () => void;
    onDecrement: () => void;
}