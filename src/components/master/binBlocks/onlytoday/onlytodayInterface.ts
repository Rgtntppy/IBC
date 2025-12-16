import { OnlytodaysData } from "../../../../data/binData/onlytodayBinData/onlytodaysBinDataInterface";
import { UsersProps } from '../../../../data/users/usersInterface';
import { HeaderTabProps } from "../../header/headerInterface";

type highlight = OnlytodaysData['highlight'];
type userAuthority = UsersProps['userAuthority'];
type addCountFlag = HeaderTabProps['addCountFlag'];

export interface OnlytodayProps extends OnlytodaysData {
    highlight: highlight;
    onNameChange: (id: number, newName:string) => void;
    onChange: (id: number, field: 'today', delta: number) => void;
    onSubChangeTentative: (id: number, field: '当日分手配品', delta: number, date?: string) => void;
    onCheckboxToggle: (id: number, key: 'isLargeDrumToday') => void;
    userAuthority: userAuthority;
    addCountFlag: addCountFlag;
    onDelete: (id: number, key: string) => void; 
}