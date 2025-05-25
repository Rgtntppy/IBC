import { UsersProps } from "../users/usersInterface";

type Authority = UsersProps['authority']

export interface extNumberProps {
    userAuthority: Authority;
    toggleMenu: () => void;
}