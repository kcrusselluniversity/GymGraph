import dayjs from "dayjs";
import { auth, db } from "../../config/firebase";
import { query, collection, getDocs } from "firebase/firestore";
import isSameDay from "../isSameDay";

/**
 * fetchDaySessionsData function
 *
 * This function takes in a dayjs object and fetches all gym sessions completed
 * on that day (for the currently signed in user).
 *
 * @param {object} day: Object representing the day.
 * @returns {array}: An array containing the session objects for the given day.
 */
const fetchDaySessionsData = async (day) => {
    const userUid = auth.currentUser.uid;
    const daySessions = [];

    try {
        // Query db for this users exercise history.
        const q = query(collection(db, `users/${userUid}/exerciseHistory`));
        const historySnapshot = await getDocs(q);

        // Check each document and add any that occur on the given day
        // to the daySessions array.
        historySnapshot.forEach((doc) => {
            const timestamp = doc.get("startTime");
            const dayObject = dayjs(timestamp);
            if (isSameDay(dayObject, day)) {
                daySessions.push(doc.data());
            }
        });
    } catch (err) {
        console.error("Error fetching day sessions data", err);
    }
};

export default fetchDaySessionsData;
