import { Button } from "@mui/material";
import CircularProgressbar from "./CircularProgressbar";
import secondsToMinutesAndSeconds from "../../utils/secondsToMinutesAndSeconds";
import {
    SECONDARY_BUTTON_STYLE,
    TIME_ADJUSTMENT_IN_SECONDS,
    INITIAL_REST_TIME,
} from "../../data/constants";
import { number, string, func } from "prop-types";
import "./RestTimer.css";
import { RestTimerContext } from '../../context/restTimerContext';
import { useContext } from 'react';

/**
 * Reusable Component to simplify RestTimer component.
 * @param {string} text: The content text of the button.
 * @param {function} onClick: Button click handler.
 */
const TimeAdjustmentButton = ({ text, onClick }) => {
    return (
        <Button variant="contained" sx={SECONDARY_BUTTON_STYLE} onClick={onClick}>
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
    // Destructure the rest timers context state
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
    } = useContext(RestTimerContext)

    const toggleRestTimer = () => {
        setIsActive((prevState) => !prevState);
    };

    const restartRestTimer = () => {
        setRemainingTime(INITIAL_REST_TIME);
        setChosenTime(INITIAL_REST_TIME);
        setIsFinished(false);
    };

    // Derived state
    const percentage = remainingTime / chosenTime;
    const chosenTimeFormatted = secondsToMinutesAndSeconds(chosenTime);
    const remainingTimeFormatted = secondsToMinutesAndSeconds(remainingTime);

    return (
        <div className="RestTimer">
            <CircularProgressbar percentage={percentage} diameter={diameter}>
                <div className="RestTimer__content">
                    <span
                        className="RestTimer__chosenTime"
                        data-testid="chosenTime"
                    >
                        {chosenTimeFormatted}
                    </span>
                    <span
                        className="RestTimer__remainingTime"
                        data-testid="remainingTime"
                    >
                        {remainingTimeFormatted}
                    </span>
                </div>
            </CircularProgressbar>
            <div className="RestTimer__timeAdjustmentButtons">
                <TimeAdjustmentButton
                    text={`- ${TIME_ADJUSTMENT_IN_SECONDS} sec`}
                    onClick={handleTimeSubtracted}
                />
                <TimeAdjustmentButton
                    text={`+ ${TIME_ADJUSTMENT_IN_SECONDS} sec`}
                    onClick={handleTimeAdded}
                />
            </div>
            {
                <Button
                    variant="contained"
                    sx={SECONDARY_BUTTON_STYLE}
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
