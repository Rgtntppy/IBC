import { UsersProps } from '../../../data/users/usersInterface';
import { MemoAreaProps } from '../memoArea/memoAreaInterface';

type userId = UsersProps['id'];
type userName = UsersProps['userName'];
type userAuthority = UsersProps['userAuthority'];

export interface HeaderTabProps {
    userId: userId;
    userName: userName;
    userAuthority: userAuthority;
    addCountFlag: boolean;
    setAddCountFlag: React.Dispatch<React.SetStateAction<boolean>>;
    reloadData: () => Promise<void>;
}