/**
 * isSameDate util function
 *
 * This function is used to check if two JS Date object have the same date.
 * @returns {boolean} true if same date, false otherwise.
 */
const isSameDate = (d1, d2) => {
    return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
    );
};

export default isSameDate;
