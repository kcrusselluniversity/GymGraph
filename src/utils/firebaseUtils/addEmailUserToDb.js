import { setDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";

/**
 * Add a user signing up with their email to the user database
 * @param {string} uid: The unique id of the user
 * @param {object} newUser: The user object to add to the database
 */
export const addEmailUserToDb = async (uid, newUser) => {
    try {
        // await addDoc(collection(db, "users"), newUser);
        await setDoc(doc(db, "users", uid), newUser)
    } catch (err) {
        console.error(err);
    }
};
