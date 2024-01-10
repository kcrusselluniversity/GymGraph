import { YEAR_MONTH_DAY_FORMAT } from "../../../data/constants";
import dayjs from "dayjs";

/**
 * isActiveDay
 * 
 * @param {object} day: The day in question.
 * @param {array} activeDays: An array of active days.
 * @param {boolean} outsideCurrentMonth: Bool indicating if the day is 
 * outside the current month.
 * @returns {boolean} True if the given day is active, false otherwise.
 */
const isActiveDay = (day, activeDays, outsideCurrentMonth) => {
    const now = dayjs();
    const isInPast = day.isBefore(now) || day.isSame(now);
    const isInCurrentMonth = !outsideCurrentMonth;
    const isSessionForThisDay = activeDays.some(
        (d) =>
            d.format(YEAR_MONTH_DAY_FORMAT) ===
            day.format(YEAR_MONTH_DAY_FORMAT)
    );
    const isActiveDay = isSessionForThisDay && isInCurrentMonth && isInPast;

    return isActiveDay;
}

export default isActiveDay;