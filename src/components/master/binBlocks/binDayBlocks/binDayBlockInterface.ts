import { HeaderTabProps } from '../../header/headerInterface';

type addCountFlag=HeaderTabProps['addCountFlag']

export interface BinDayBlockProps {
    label: string;
    className: string;
    count: number;
    rightClickCount: number;
    alertborder: number;
    showCheckbox: boolean;
    checked: boolean;
    checkboxLabel?: string;
    onIncrement: () => void;
    onDecrement: () => void;
    onSubIncrement: () => void;
    onSubDecrement: () => void;
    onCheckboxToggle: () => void;
    addCountFlag: addCountFlag;
}