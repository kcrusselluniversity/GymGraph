import { DateCalendar, DayCalendarSkeleton } from "@mui/x-date-pickers";
import CustomDayComponent from "./CustomDayComponent";
import useFetchActiveDays from "../hooks/useFetchActiveDays";

/**
 * Calendar Component
 * This component renders a calendar. On mount it fetches the users session
 * data and stores it in state in order to display useful information in the
 * calendar.
 */
const Calendar = () => {
    const { isLoading, activeDays } = useFetchActiveDays();

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
