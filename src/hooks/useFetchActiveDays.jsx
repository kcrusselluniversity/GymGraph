import { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { collection, query, getDocs } from "firebase/firestore";
import dayjs from "dayjs";

/**
 * useFetchActiveDays hook
 * 
 * This custom hook is used to fetch the days the user has completed 
 * a gym session from the database.
 * 
 * @returns {object}: An object that contains the isLoading bool and 
 * the activeDays array.
 * @param {bool} isLoading: indicates whether the data is being fetched or 
 * the fetch has been complete. 
 * @param {array} activeDays: An array of dayjs objects representing the timestamps of the users gym sessions
 * the user has completed a gym session.  
 */
const useFetchActiveDays = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [activeDays, setActiveDays] = useState([]);

    // Fetch the users history on mount, to be used to determine
    // which days the user completed a gym session and hence whether to
    // highlight that day on the calendar
    useEffect(() => {
        async function fetchActiveDays() {
            try {
                const userUid = auth.currentUser.uid;
                let activeDaysArray = [];

                // Query db for this users exercise history
                const q = query(
                    collection(db, `users/${userUid}/exerciseHistory`)
                );
                const historySnapshot = await getDocs(q);

                // Get the startTime from each session
                historySnapshot.forEach((doc) => {
                    const { startTime } = doc.data();
                    activeDaysArray.push(startTime);
                });

                // Map the activeDay strings to a dayjs objects
                activeDaysArray = activeDaysArray.map((activeDay) =>
                    dayjs(activeDay)
                );

                // Update the state
                setActiveDays(activeDaysArray);
            } catch (err) {
                console.error("Error fetching active days", err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchActiveDays();
    }, []);

    return { isLoading, activeDays };
};

export default useFetchActiveDays;
