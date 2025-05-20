export interface BinDayBlockProps {
    label: string;
    className: string;
    count: number;
    limit: number;
    showCheckbox: boolean;
    checked: boolean;
    checkboxLabel?: string;
    onIncrement: () => void;
    onDecrement: () => void;
    onCheckboxToggle: () => void;
    role: string;
}