import { DateCalendar, DayCalendarSkeleton } from "@mui/x-date-pickers";
import { PickersDay } from "@mui/x-date-pickers";
import { array, bool, object } from "prop-types";
import { useEffect, useState } from "react";
import { auth, db } from "../../../config/firebase";
import { collection, query, getDocs } from "firebase/firestore";
import dayjs from "dayjs";

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

            activeDaysArray = activeDaysArray.map((activeDay) =>
                dayjs(activeDay)
            );
            setActiveDays(activeDaysArray);
            setIsLoading(false);
        }

        fetchActiveDays();
    }, []);

    return (
        <DateCalendar
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
