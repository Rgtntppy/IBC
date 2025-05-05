import Holidays from 'date-holidays';
import dayjs from 'dayjs';

const hd = new Holidays('JP');

export function getNextBusinessDay(ymd: string): string {
    let date = dayjs(ymd, 'YYYYMMDD').add(1, 'day');

    while (
        date.day() === 0 || //日曜日
        date.day() === 6 || //土曜日
        hd.isHoliday(date.toDate())
    ) {
        date = date.add(1, 'day');
    }

    return date.format('YYYYMMDD');
}