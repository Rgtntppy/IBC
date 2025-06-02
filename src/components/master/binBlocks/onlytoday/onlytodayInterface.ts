import { OnlytodaysData } from "../../../../data/binData/onlytodayBinData/onlytodaysBinDataInterface";

export interface OnlytodayProps extends OnlytodaysData {
    onNameChange: (id: number, newName:string) => void;
    onChange: (id: number, field: 'today', delta: number) => void;
    onCheckboxToggle: (id: number, key: 'isLargeDrumToday') => void;
}