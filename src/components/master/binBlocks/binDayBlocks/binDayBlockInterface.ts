import { UsersProps } from "../../../../data/users/usersInterface";

type role = UsersProps['role'];
type userAuthority = UsersProps['userAuthority'];

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
    role: role;
    authority: userAuthority;
}