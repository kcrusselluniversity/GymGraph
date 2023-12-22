import { setDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";

/**
 * Add a new user to the user database
 * @param {string} uid: The unique id of the user
 * @param {object} newUser: The user object to add to the database
 */
export const addUserToDb = async (uid, newUser) => {
    try {
        await setDoc(doc(db, "users", uid), newUser);
    } catch (err) {
        console.error(err);
    }
};
