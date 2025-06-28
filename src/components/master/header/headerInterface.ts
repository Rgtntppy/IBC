import { UsersProps } from '../../../data/users/usersInterface';
import { MemoAreaProps } from '../memoArea/memoAreaInterface';

type memo = MemoAreaProps['memo'];
type setMemo = MemoAreaProps['setMemo'];
type handleBlur = MemoAreaProps['handleBlur'];

type userAuthority = UsersProps['userAuthority'];
export interface HeaderTabProps {
    userName: string;
    userAuthority: userAuthority;
    addCountFlag: boolean;
    setAddCountFlag: React.Dispatch<React.SetStateAction<boolean>>;
    reloadData: () => Promise<void>;
    memo: memo;
    setMemo: setMemo;
    handleBlur: handleBlur;
}