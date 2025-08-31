import { UsersProps } from '../../../../../data/users/usersInterface';

type userAuthority = UsersProps['userAuthority'];

export interface ResetAllAlertsProps {
    userAuthority: userAuthority;
    handleResetAllAlerts: () => void;
}