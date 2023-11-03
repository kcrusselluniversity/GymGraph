/**
 * Checks if an objects attributes values are all null
 * 
 * @param {any} obj: The object to test 
 * @returns {boolean} True if all the attributes values are null, false otherwise
 */
export default function areAllAttributesNull(obj) {
    return Object.values(obj).every((value) => value === null);
}
