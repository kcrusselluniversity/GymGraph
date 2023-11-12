import { collection, addDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

/**
 * Add a user signing up with their email to the user database
 * @param {object} newUser: The user object to add to the database
 */
export const addEmailUserToDb = async (newUser) => {
    try {
        await addDoc(collection(db, "users"), newUser);
    } catch (err) {
        console.error(err);
    }
};
