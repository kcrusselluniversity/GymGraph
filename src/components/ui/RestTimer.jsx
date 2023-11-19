import CircularProgressbar from "./CircularProgressbar";
import { Button } from "@mui/material";
import { number, string, func } from "prop-types";
import useCountdown from "../../hooks/useCountdown";
import useRestTimer from "../../hooks/useRestTimer";
import "./RestTimer.css";
import {
    SecondaryButtonStyle,
    timeAdjustmentInSeconds,
    initialRestTime,
} from "../../data/constants";
import secondsToMinutesAndSeconds from "../../utils/secondsToMinutesAndSeconds";

/**
 * Reusable Component to simplify RestTimer component.
 * @param {string} text: The content text of the button.
 * @param {function} onClick: Button click handler.
 */
const TimeAdjustmentButton = ({ text, onClick }) => {
    return (
        <Button variant="contained" sx={SecondaryButtonStyle} onClick={onClick}>
            {text}
        </Button>
    );
};

/**
 * RestTimer is a countdown timer used for managing the rest period between
 * sets.
 * 
 * This component allows the user to set a timer, pause the timer, as well
 * as update the timer in real time if the user wants to increase or decrease
 * the duration of their rest for that particular rest session.
 * Once the timer has finished, the user can reset it to use again.
 *
 * @param {number} diameter: Prop for the desired diameter of the
 * UI element (in pixels).
 */
const RestTimer = ({ diameter }) => {
    // Destructure the useRestTimer custom hook state
    const {
        chosenTime,
        setChosenTime,
        remainingTime,
        setRemainingTime,
        handleTimeAdded,
        handleTimeSubtracted,
        isActive,
        setIsActive,
        isFinished,
        setIsFinished,
    } = useRestTimer();

    // use the Countdown custom hook
    useCountdown(
        isActive,
        setIsActive,
        remainingTime,
        setRemainingTime,
        isFinished,
        setIsFinished
    );

    const toggleRestTimer = () => {
        setIsActive((prevState) => !prevState);
    };

    const restartRestTimer = () => {
        setRemainingTime(initialRestTime);
        setChosenTime(initialRestTime);
        setIsFinished(false);
    };

    // Derived state
    const percentage = (remainingTime / chosenTime) * 100;
    const chosenTimeFormatted = secondsToMinutesAndSeconds(chosenTime);
    const remainingTimeFormatted = secondsToMinutesAndSeconds(remainingTime);

    return (
        <div className="RestTimer">
            <CircularProgressbar percentage={percentage} diameter={diameter}>
                <div className="RestTimer__content">
                    <span className="RestTimer__chosenTime">
                        {chosenTimeFormatted}
                    </span>
                    <span className="RestTimer__remainingTime">
                        {remainingTimeFormatted}
                    </span>
                </div>
            </CircularProgressbar>
            <div className="RestTimer__timeAdjustmentButtons">
                <TimeAdjustmentButton
                    text={`- ${timeAdjustmentInSeconds} sec`}
                    onClick={handleTimeSubtracted}
                />
                <TimeAdjustmentButton
                    text={`+ ${timeAdjustmentInSeconds} sec`}
                    onClick={handleTimeAdded}
                />
            </div>
            {
                <Button
                    variant="contained"
                    sx={SecondaryButtonStyle}
                    onClick={isFinished ? restartRestTimer : toggleRestTimer}
                >
                    {isFinished ? "Reset" : isActive ? "Pause" : "Start"}
                </Button>
            }
        </div>
    );
};

TimeAdjustmentButton.propTypes = {
    text: string,
    onClick: func,
};

RestTimer.propTypes = {
    diameter: number,
};

export default RestTimer;
