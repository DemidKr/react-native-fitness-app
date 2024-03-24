import dayjs from "dayjs";
import calendar from 'dayjs/plugin/calendar';
dayjs.extend(calendar)

export const getFormattedDate = (date: Date) => {
    return dayjs(date).calendar(null, {
        sameDay: '[Сегодня]',
        nextDay: '[Вчера]',
        lastDay: '[Завтра]',
        nextWeek: 'DD.MM.YYYY',
        lastWeek: 'DD.MM.YYYY',
        sameElse: 'DD.MM.YYYY'
    })
}