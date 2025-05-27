import { UsersProps } from "../../../data/users/usersInterface";
import { TodayLabelData } from '../../../firebase/todayLabelData/todayLabelDataInterface';

type userAuthority = UsersProps['userAuthority'];
type currentData = TodayLabelData['currentData'];
type displayDate = TodayLabelData['displayDate']

export interface TodayLabelProps {
    currentDate: currentData;
    setCurrentDate: (date: string) => void;
    displayDate: displayDate;
    setDisplayDate: (display: string) => void;
    isDateConfirmed: boolean;
    setIsDateConfirmed: (b: boolean) => void;
    prepareNextDay: () => void;
    authority: userAuthority;
};