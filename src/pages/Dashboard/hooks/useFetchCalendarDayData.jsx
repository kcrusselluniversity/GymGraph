import { auth, db } from "../../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useContext } from "react";
import { dashboardContext } from "../../../context/DashboardContext";
import compileDayExercises from "../../../utils/compileDayExercises";

/**
 * useFetchCalendarDayData
 *
 * @param {object} day: The calendar day the user has selected
 * @param {any} activeDays: An array of the day objects where the user has
 * completed a gym session.
 *
 * This custom hook returns a function that, when called, queries the database
 * for the data for any gym sessions completed on that day and updates the state with this data.
 */
const useFetchCalendarDayData = (day, activeDays) => {
    // Destructure required context
    const { setSelectedDateHistory } = useContext(dashboardContext);

    const fetchCalendarDayData = async () => {
        try {
            const sessionObjects = [];
            const userUid = auth.currentUser.uid;

            // Get the timestamp/s associated with that day
            const startTimes = activeDays.filter((activeDay) =>
                activeDay.isSame(day, "day")
            );

            // Get the data associated with that day
            const fetchSessionDataPromises = startTimes.map(
                async (timestamp) => {
                    const sessionUid = timestamp.valueOf();
                    const docRef = doc(
                        db,
                        `users/${userUid}/exerciseHistory/${sessionUid}`
                    );

                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) sessionObjects.push(docSnap.data());
                }
            );

            // Wait for all data to be fetched
            await Promise.all(fetchSessionDataPromises);

            // Compile all sessions for that day into a single session object
            const compiledSessionsObject = compileDayExercises(sessionObjects);

            // Update state with fetched data
            setSelectedDateHistory(compiledSessionsObject);
        } catch (err) {
            console.error("Error fetching day data", err);
        }
    };

    return { fetchCalendarDayData };
};

export default useFetchCalendarDayData;
