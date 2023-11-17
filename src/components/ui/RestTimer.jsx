import CircularProgressbar from "./CircularProgressbar";
import { number } from "prop-types";
import "./RestTimer.css";

const RestTimer = ({ percentage }) => {
    return (
        <CircularProgressbar percentage={percentage}>
            <div className="RestTimer__content">
                <span className="RestTimer__chosenTime">2:30</span>
                <span className="RestTimer__remainingTime">1:59</span>
            </div>
        </CircularProgressbar>
    );
};

RestTimer.propTypes = {
    percentage: number,
};

export default RestTimer;
