import { UsersProps } from "../../../../data/users/usersInterface";

type userId = UsersProps['id'];
type userName = UsersProps['userName'];
type userAuthority = UsersProps['userAuthority'];

export interface HamburgerProps {
    userId: userId;
    userName: userName;
    userAuthority: userAuthority;
}