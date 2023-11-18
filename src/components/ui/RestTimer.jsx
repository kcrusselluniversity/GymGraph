import CircularProgressbar from "./CircularProgressbar";
import { Button } from "@mui/material";
import { number } from "prop-types";
import "./RestTimer.css";
import useCountdown from "../../hooks/useCountdown";
import useRestTimer from "../../hooks/useRestTimer";
import {
    SecondaryButtonStyle,
    timeAdjustmentInSeconds,
    initialRestTime,
} from "../../data/constants";

const RestTimer = ({ diameter }) => {
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

    // use the Countdown hook
    useCountdown(
        isActive,
        setIsActive,
        remainingTime,
        setRemainingTime,
        isFinished,
        setIsFinished
    );

    const handleToggleRestTimerClick = () => {
        setIsActive((prevState) => !prevState);
    };

    const handleRestartRestTimerClick = () => {
        setRemainingTime(initialRestTime);
        setChosenTime(initialRestTime);
        setIsFinished(false);
    };

    // Derived state 
    const percentage = (remainingTime/chosenTime)*100;
    
    return (
        <div className="RestTimer">
            <CircularProgressbar percentage={percentage} diameter={diameter}>
                <div className="RestTimer__content">
                    <span className="RestTimer__chosenTime">{chosenTime}</span>
                    <span className="RestTimer__remainingTime">
                        {remainingTime}
                    </span>
                </div>
            </CircularProgressbar>
            <div className="RestTimer__timeAdjustmentButtons">
                <Button
                    variant="contained"
                    sx={SecondaryButtonStyle}
                    onClick={handleTimeSubtracted}
                >
                    -{timeAdjustmentInSeconds}
                </Button>
                <Button
                    variant="contained"
                    sx={SecondaryButtonStyle}
                    onClick={handleTimeAdded}
                >
                    +{timeAdjustmentInSeconds}
                </Button>
            </div>
            {isFinished ? (
                <Button
                    variant="contained"
                    sx={SecondaryButtonStyle}
                    onClick={handleRestartRestTimerClick}
                >
                    Restart
                </Button>
            ) : (
                <Button
                    variant="contained"
                    sx={SecondaryButtonStyle}
                    onClick={handleToggleRestTimerClick}
                >
                    {isActive ? "Pause" : "Start"}
                </Button>
            )}
        </div>
    );
};

RestTimer.propTypes = {
    percentage: number,
    diameter: number,
};

export default RestTimer;
