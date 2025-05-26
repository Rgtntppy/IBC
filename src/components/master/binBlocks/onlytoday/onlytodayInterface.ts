import { UsersProps } from "../../../../data/users/usersInterface";

type role = UsersProps['role']
type authority = UsersProps['authority']
export interface OnlytodayProps {
    id: number;
    bin: string;
    today: number;
    isLargeDrumToday:boolean;
    limit: number;
    highlight: string;
    onChange: (id: number, field: 'today', delta: number) => void;
    onCheckboxToggle: (id: number, key: 'isLargeDrumToday') => void;
    role: role;
    authority: authority;
}

export const onlytodaysData = [
    { id:  8, bin: "仮1", today: 0, isLargeDrumToday: false, limit: 10, highlight: "white" },
    { id:  9, bin: "仮2", today: 0, isLargeDrumToday: false, limit: 10, highlight: "white" },
] 