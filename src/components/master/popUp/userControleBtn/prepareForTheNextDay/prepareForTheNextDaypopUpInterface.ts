import { UsersProps } from '../../../../../data/users/usersInterface';

type userAuthority = UsersProps['userAuthority'];

export interface PrepareForTheNextDayProps {
    userAuthority: userAuthority;
    handlePrepareNextDay: () => void;
}