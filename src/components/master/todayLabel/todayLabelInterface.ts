import { UsersProps } from "../../../data/users/usersInterface";
import { TodayLabelData } from '../../../firebase/todayLabelData/todayLabelDataInterface';

type userAuthority = UsersProps['userAuthority'];
type currentDate = TodayLabelData['currentDate'];
type displayDate = TodayLabelData['displayDate']

export interface TodayLabelProps {
    hasInitialized: boolean;
    currentDate: currentDate;
    setCurrentDate: (date: string) => void;
    displayDate: displayDate;
    setDisplayDate: (display: string) => void;
    isDateConfirmed: boolean;
    setIsDateConfirmed: (b: boolean) => void;
    prepareNextDay: () => void;
    authority: userAuthority;
};