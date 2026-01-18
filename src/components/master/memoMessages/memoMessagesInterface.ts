import { Timestamp } from "firebase/firestore";
import { UsersProps } from "../../../data/users/usersInterface"

type id   = UsersProps['id'];
type userName = UsersProps['userName'];
type userAuthority = UsersProps['userAuthority'];

export type MemoSubmitHandler = () => Promise<void>;
export type MemoKeyDownHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>, onSubmit: MemoSubmitHandler) => void;

export interface MemoBoardProps {
    user: {
        uid: id;
        name: userName;
    };
    userAuthority: userAuthority;
}

export interface MemoInputProps {
    user: {
        uid: id;
        name: userName;
    };
    onKeyDown: MemoKeyDownHandler;
    onCompositionEnd: () => void;
}

export interface MemoMessageItemProps {
    message: MemoMessage;
    user: {
        uid: id;
        name: userName;
    };
    userAuthority: userAuthority;
    onKeyDown: MemoKeyDownHandler;
}

export interface MemoMessage {
    id: string;
    content: string;
    createdAt: Timestamp;
    createdByUid: id;
    createdByName: userName;
    updatedAt?: Timestamp;
    updatedByUid?: id;
}