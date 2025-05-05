export interface TodayLabelProps {
    currentDate: string;
    setCurrentDate: (date: string) => void;
    displayDate: string;
    setDisplayDate: (display: string) => void;
    isDateConfirmed: boolean;
    setIsDateConfirmed: (b: boolean) => void;
    prepareNextDay: () => void;
};