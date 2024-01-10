import { PickersDay } from "@mui/x-date-pickers";
import { array, bool, object } from "prop-types";
import useFetchCalendarDayData from "../../../hooks/useFetchCalendarDayData";
import isActiveDay from "../utils/isActiveDay";

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
    const { fetchCalendarDayData } = useFetchCalendarDayData(day, activeDays);

    // Determine if the day should be highlighted to indicate a session was
    // completed on this day
    const isHighlight = isActiveDay(day, activeDays, outsideCurrentMonth);

    const dayStyle = {
        backgroundColor: isHighlight ? "rgba(0,255,0,0.4)" : "transparent",
        color: isHighlight ? "white" : "inherit",
        borderRadius: "100%",
    };

    // Function to handle when the user clicks on a day in the calendar
    const handleDayClick = () => {
        if (!isHighlight) return;
        fetchCalendarDayData();
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
