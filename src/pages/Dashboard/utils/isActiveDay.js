import isSameDate from "./isSameDate";

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
    const now = new Date();
    const dayObject = new Date(day);
    const isInPast = day <= now;
    const isInCurrentMonth = !outsideCurrentMonth;
    const isSessionForThisDay = activeDays.some((d) =>
        isSameDate(d, dayObject)
    );
    const isActiveDay = isSessionForThisDay && isInCurrentMonth && isInPast;

    return isActiveDay;
};

export default isActiveDay;
