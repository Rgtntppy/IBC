import { UsersProps } from "../../../../data/users/usersInterface";

type userAuthority = UsersProps['userAuthority'];
export interface HamburgerProps {
    userAuthority: userAuthority;
}