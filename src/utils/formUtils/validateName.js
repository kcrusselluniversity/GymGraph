export const maxLengthName = 30;

/**
 * Valiates a users first name
 *
 * @param {string} firstName: The name input by the user
 * @returns a string containing an error message if the first name is
 * invalid, else returns null
 */
export default function validateName(firstName) {
    if (firstName.length === 0) return "first name required";

    if (firstName.includes(" ")) return "no spaces allowed";

    const isAlphabetic = /^[A-Za-z]+$/.test(firstName);
    if (!isAlphabetic) return "only alphabetic characters allowed";

    if (firstName.length >= maxLengthName) return "first name too long";
    return null;
}