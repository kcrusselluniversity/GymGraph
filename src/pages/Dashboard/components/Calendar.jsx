import { DateCalendar, DayCalendarSkeleton } from "@mui/x-date-pickers";
import { PickersDay } from "@mui/x-date-pickers";
import { array, bool, object } from "prop-types";
import { useEffect, useState } from "react";
import { auth, db } from "../../../config/firebase";
import { collection, query, getDocs } from "firebase/firestore";
import dayjs from "dayjs";

/**
 * CustomDay Component
 *
 * This component is used in place of the day component in the Material UI
 * DateCalendar component. We use a custom day component so we can display
 * to the user a graphical representation of how many days they have gone
 * to the gym in the given month.
 */
const CustomDayComponent = ({
    day,
    activeDays,
    outsideCurrentMonth,
    ...others
}) => {
    const handleDaySelect = () => {};

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

    return (
        <div style={dayStyle}>
            <PickersDay
                onDaySelect={handleDaySelect}
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
