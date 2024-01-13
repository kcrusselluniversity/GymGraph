import { YEAR_MONTH_DAY_FORMAT } from "../../../data/constants";

/**
 * This function compares a date string (in the form 2024-01-09T02:39:36.977Z
 * for example) with a dayjs object and returns true if they occur on the
 * same day (ie have the same date).
 *
 * We need to do this as timezone issues occur when using dayjs objects.
 * When we convert a string to a dayjs object it will update the strings time
 * based on the local timezone as determined by your local machine. So when
 * converting the string 2024-01-09T02:39:36.977Z to a dayjs object in Sydney
 * for example it will add 11 hours to the time and thus be 
 * 2024-01-09T13:39:36.977Z. This becomes an issue when the addition of the 
 * timezone hours results in the date moving to the next day. When this happens
 * we end up displaying session data from the previous day to the user. 
 *
 * As the calendar Material UI component uses dayjs under the hood, when we
 * attempt to extend the dayjs library with a utc library to deal with this
 * issue it causes the Material UI component to malfunction.
 *
 * So to solve this, this function takes in a date string which we want to 
 * compare to a different dayjs object and determine if they represent 
 * the same date. We do this by converting the dayjs object to the same 
 * string format of the dateString we wish to compare.
 */
const isSameDay = (dateString, dateObject) => {
    const dateObjectString = dateObject.format(YEAR_MONTH_DAY_FORMAT);
    const dateStringFormatted = dateString.slice(0, 10);

    return dateObjectString === dateStringFormatted;
};

export default isSameDay;
