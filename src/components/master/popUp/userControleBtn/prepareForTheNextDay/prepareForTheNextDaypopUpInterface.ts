import { UsersProps } from '../../../../../data/users/usersInterface';
import { TodayLabelData } from '../../../../../firebase/todayLabelData/todayLabelDataInterface';

type userAuthority = UsersProps['userAuthority'];
type displayDate = TodayLabelData['displayDate']

export interface PrepareForTheNextDayProps {
    userAuthority: userAuthority;
    handlePrepareNextDay: () => void;
    displayDate: displayDate;
}