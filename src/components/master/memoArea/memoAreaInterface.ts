import { UsersProps } from "../../../data/users/usersInterface";

type userAuthority = UsersProps['userAuthority'];

export interface MemoAreaProps {
    memo: string;
    setMemo: React.Dispatch<React.SetStateAction<string>>;
    handleBlur: () => Promise<void>;
    userAuthority: userAuthority;
}