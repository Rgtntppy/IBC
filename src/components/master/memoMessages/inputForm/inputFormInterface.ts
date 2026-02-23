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
  