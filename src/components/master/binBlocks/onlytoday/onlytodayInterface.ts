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
    onCheckboxToggle: (id: number, key: 'isLargeDrumToday') => void;
    userAuthority: userAuthority;
    addCountFlag: addCountFlag;
}