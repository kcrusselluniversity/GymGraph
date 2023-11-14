/**
 * A custom error class to mimic error objects thrown by firebase/auth
 * @param {string} message
 * @param {string} code
 */
class FirebaseAuthCustomError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
        this.name = this.constructor.name;
    }
}
export default FirebaseAuthCustomError;
