import { DateCalendar, DayCalendarSkeleton } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { auth, db } from "../../../config/firebase";
import { collection, query, getDocs } from "firebase/firestore";
import CustomDayComponent from "./CustomDayComponent";
import dayjs from "dayjs";

/**
 * Calendar Component
 * This component renders a calendar. On mount it fetches the users session
 * data and stores it in state in order to display useful information in the
 * calendar.
 */
const Calendar = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [activeDays, setActiveDays] = useState([]);

    // Fetch the users history on mount, to be used to determine
    // which days the user completed a gym session and hence whether to
    // highlight that day on the calendar
    useEffect(() => {
        async function fetchActiveDays() {
            const userUid = auth.currentUser.uid;
            let activeDaysArray = [];

            // Query db for this users exercise history
            const q = query(collection(db, `users/${userUid}/exerciseHistory`));
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
            setIsLoading(false);
        }

        fetchActiveDays();
    }, []);

    return (
        <DateCalendar
            className="Dashboard__Calendar"
            disableFuture
            loading={isLoading}
            renderLoading={() => <DayCalendarSkeleton />}
            slots={{ day: CustomDayComponent }}
            slotProps={{
                day: {
                    activeDays,
                },
            }}
        />
    );
};

export default Calendar;
