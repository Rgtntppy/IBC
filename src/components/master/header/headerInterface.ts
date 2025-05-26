import { UsersProps } from "../../../data/users/usersInterface";

type userAuthority = UsersProps['userAuthority'];
export interface HeaderTabProps {
    userName: string;
    userAuthority: userAuthority;
}