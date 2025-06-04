import { OnlytodaysData } from "../../../../data/binData/onlytodayBinData/onlytodaysBinDataInterface";
import { UsersProps } from '../../../../data/users/usersInterface';

type userAuthority = UsersProps['userAuthority'];
export interface OnlytodayProps extends OnlytodaysData {
    onNameChange: (id: number, newName:string) => void;
    onChange: (id: number, field: 'today', delta: number) => void;
    onCheckboxToggle: (id: number, key: 'isLargeDrumToday') => void;
    userAuthority: userAuthority;
}