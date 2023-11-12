import { collection, query, where, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

export const addGoogleUserToDb = async (newUser) => {
    try {
        const { email: newUserEmail } = newUser;

        // See if user has already been added
        const usersCollectionRef = collection(db, "users");
        const userEmailsQuery = query(
            usersCollectionRef,
            where("email", "==", newUserEmail)
        );
        const querySnapshot = await getDocs(userEmailsQuery);

        // Return early if user is already in the database
        if (!querySnapshot.empty) return;

        // Add new Google user
        await addDoc(usersCollectionRef, newUser);
    } catch (err) {
        console.error(err);
    }
};
