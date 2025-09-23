import { UsersProps } from '../../../../data/users/usersInterface';

type userAuthority = UsersProps['userAuthority'];

export interface RuleBookProps {
    userAuthority: userAuthority;
    onOpen: () => void;
    onClose: () => void;
}