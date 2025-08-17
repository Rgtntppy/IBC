import { UsersProps } from "../../../../data/users/usersInterface";

type userAuthority = UsersProps['userAuthority'];

export interface PrepareForTheNextDayPopUpProps {
    userAuthority: userAuthority;
    handlePrepareNextDay: () => void;
}