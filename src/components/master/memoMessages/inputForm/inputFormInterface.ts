import { UsersProps } from "../../../../data/users/usersInterface"

type id   = UsersProps['id'];
type userName = UsersProps['userName'];

export interface StructuredMemoFormProps {
    user: {
      uid: id;
      name: userName;
    };
    onClose: () => void;
}

export interface MemoBlock {
  date: string;
  bin: string;
  destination: string;
  item: string;
  size: string;
  slipNo: string;
}