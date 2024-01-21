/**
 * The formatDateObject function is designed to format date objects into a
 * specific string format. It utilizes the dayjs library to handle
 * date and time formatting.
 * This function is primarily used to format dates for display purposes,
 * such as rendering dates on the X-axis of a graph.
 * @param {Date Object} date: This is the date object that needs to be formatted.
 * It should be a valid JavaScript Date object
 * @returns {string}: Returns a string representing the formatted date.
 * The format of the output string is "DD-MM-YY hh:mm", where DD is the day,
 * MM is the month, YY is the year, hh is the hour, and mm is the minute.
 */
import dayjs from "dayjs";

const formatDateObject = (date) => {
    // Format startTime for use in the graph X axis
    let dateFormatted = new dayjs(date);
    return dateFormatted.format("DD-MM-YY hh:mm");
};

export default formatDateObject;
