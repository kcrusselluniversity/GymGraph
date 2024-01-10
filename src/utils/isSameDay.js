import { YEAR_MONTH_DAY_FORMAT } from "../data/constants";

/**
 * This function compares two dayjs objects and returns true if they occur
 * on the same day.
 */
const isSameDay = (day1, day2) =>
    day1.format(YEAR_MONTH_DAY_FORMAT) === day2.format(YEAR_MONTH_DAY_FORMAT);

export default isSameDay;
