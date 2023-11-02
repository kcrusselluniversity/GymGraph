export const maxLengthName = 30;

/**
 * Valiates a users name
 *
 * @param {string} name: The name input by the user
 * @returns a string containing an error message if the name is
 * invalid, else returns null
 */
export default function validateName(name) {
    if (name.length === 0) return "name required";

    if (name.includes(" ")) return "no spaces allowed";

    const isAlphabetic = /^[A-Za-z]+$/.test(name);
    if (!isAlphabetic) return "only alphabetic characters allowed";

    if (name.length >= maxLengthName) return "name too long";
    return null;
}