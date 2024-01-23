import dayjs from "dayjs";
import { PropTypes } from "prop-types";

const FormattedDate = ({ dateObject }) => {
    const startTimeObject = dayjs(dateObject);
    const day = startTimeObject.format("ddd");
    const date = startTimeObject.format("D MMM YYYY");

    return (
        <div className="sessionHistorySummary__date">
            <b>{day}</b>
            <br />
            <span>{date}</span>
        </div>
    );
};

FormattedDate.propTypes = {
    dateObject: PropTypes.instanceOf(Date),
};

export default FormattedDate;
