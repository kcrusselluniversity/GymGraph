import { collection, addDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

export const addUserToDb = async (newUser) => {
    try {
        await addDoc(collection(db, "users"), newUser)
    } catch (err) {
        console.error(err);
    }
};