import Holidays from 'date-holidays';

const hd = new Holidays('JP');

export function getNextBusinessDay(fromDate: Date): Date {
    const date = new Date(fromDate);
    date.setDate(date.getDate() + 1);

    while (
        date.getDay() === 0 || //日曜日
        date.getDay() === 6 || //土曜日
        hd.isHoliday(date)
    ) {
        date.setDate(date.getDate() + 1);
    }

    return date;
}