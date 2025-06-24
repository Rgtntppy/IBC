import { UsersProps } from "../../../../data/users/usersInterface";
import { MemoAreaProps } from '../../memoArea/memoAreaInterface';

type userAuthority = UsersProps['userAuthority'];
type memo = MemoAreaProps['memo'];
type setMemo = MemoAreaProps['setMemo'];
type handleBlur = MemoAreaProps['handleBlur'];
export interface HamburgerProps {
    userAuthority: userAuthority;
    memo: memo;
    setMemo: setMemo;
    handleBlur: handleBlur;
}