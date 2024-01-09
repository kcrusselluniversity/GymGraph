import { PickersDay } from "@mui/x-date-pickers";
import { array, bool, object } from "prop-types";
import { auth, db } from "../../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import dayjs from "dayjs";
import { useContext } from "react";
import { dashboardContext } from "../../../context/DashboardContext";

/**
 * CustomDay Component
 *
 * This component is used in as a custom day component in the Material UI
 * DateCalendar component. We use a custom day component so we can display
 * to the user a visual representation of how many days they have gone
 * to the gym in the given month.
 *
 * If the user completed a session on this day, the day will be highlighted
 * on the calendar.
 */
const CustomDayComponent = ({
    day,
    activeDays,
    outsideCurrentMonth,
    ...others
}) => {
    // Destructure required context
    const { setSelectedDateHistory, setIsSelectedDateModalOpen } =
        useContext(dashboardContext);

    // Current date today
    const now = dayjs();

    // Determine if the day should be highlighted to indicate a session was
    // completed on this day
    const isSessionForThisDay = activeDays.some(
        (d) => d.format("YYYY-MM-DD") === day.format("YYYY-MM-DD")
    );
    const isInPast = day.isBefore(now) || day.isSame(now);
    const isInCurrentMonth = !outsideCurrentMonth;
    const isHighlight = isSessionForThisDay && isInCurrentMonth && isInPast;

    const dayStyle = {
        backgroundColor: isHighlight ? "rgba(0,255,0,0.4)" : "transparent",
        color: isHighlight ? "white" : "inherit",
        borderRadius: "100%",
    };

    // Function to handle when the user clicks on a specific day in the calendar
    const handleDayClick = async () => {
        if (!isHighlight) return;

        const sessionObjects = [];
        const userUid = auth.currentUser.uid;

        // Get the timestamp/s associated with that day
        const startTimes = activeDays.filter((activeDay) =>
            activeDay.isSame(day, "day")
        );

        // Get the data associated with that day
        const fetchSessionDataPromises = startTimes.map(async (timestamp) => {
            const sessionUid = timestamp.valueOf();
            const docRef = doc(
                db,
                `users/${userUid}/exerciseHistory/${sessionUid}`
            );

            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) sessionObjects.push(docSnap.data());
        });

        // Wait for all data to be fetched
        await Promise.all(fetchSessionDataPromises);

        // Compile all sessions for that day into a single session object
        const compiledDaysExercises = {};

        // Loop over each exercise in each session and add it to the
        // compiled days exercises. If the exercise has already been added,
        // add the additional sets to that property.
        sessionObjects.map((session) => {
            Object.values(session["exercises"]).map((exercise) => {
                const { uid, sets } = exercise;

                if (uid in compiledDaysExercises) {
                    // Add sets to existing sets array
                    compiledDaysExercises[uid].sets.push(...sets);
                } else {
                    // Add exercise data to object
                    compiledDaysExercises[uid] = exercise;
                }
            });
        });

        const compiledDaysSessions = {
            startTime: sessionObjects[0]["startTime"],
            exercises: compiledDaysExercises,
        };

        // Render the modal with days history
        setSelectedDateHistory(compiledDaysSessions);
        setIsSelectedDateModalOpen(true);
    };

    return (
        <div style={dayStyle}>
            <PickersDay
                onClick={handleDayClick}
                day={day}
                outsideCurrentMonth={outsideCurrentMonth}
                {...others}
            />
        </div>
    );
};

CustomDayComponent.propTypes = {
    day: object,
    activeDays: array,
    outsideCurrentMonth: bool,
};

export default CustomDayComponent;
