import { UsersProps } from "../../../data/users/usersInterface";

type userAuthority = UsersProps['userAuthority'];

export interface MemoAreaProps {
    userId: string;
    userName: string; 
    userAuthority: userAuthority;
}