import { UsersProps } from '../../../../../data/users/usersInterface';

type userId = UsersProps['id']

export interface WarningPopupProps {
    userId: userId;
    onClose: () => void;
}