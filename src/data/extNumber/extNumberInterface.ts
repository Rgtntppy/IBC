import { UsersProps } from "../users/usersInterface";

type userAuthority = UsersProps['userAuthority'];

export interface extNumberProps {
    userAuthority: userAuthority;
    onOpen: () => void;
    onClose: () => void;
}