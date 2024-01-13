import { DateCalendar, DayCalendarSkeleton } from "@mui/x-date-pickers";
import CustomDayComponent from "./CustomDayComponent";
import { useContext } from "react";
import { historyContext } from "../../../context/historyContext";
import dayjs from "dayjs";

/**
 * Calendar Component
 * This component renders a calendar. On mount it fetches the users session
 * data and stores it in state in order to display useful information in the
 * calendar.
 */
const Calendar = () => {
    const { isLoading, userHistory } = useContext(historyContext);
    let activeDays = [];
    
    if (!isLoading) {
        activeDays = userHistory.map(session => dayjs(session.startTime))
    }

    return (
        <DateCalendar
            className="Dashboard__Calendar Card"
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
