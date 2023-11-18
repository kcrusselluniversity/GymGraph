import { useState } from "react";
import {
    timeAdjustmentInSeconds,
    maxRestTimerDurationInSeconds,
    initialRestTime,
} from "../data/constants";

/**
 * Rest Timer Hook
 * @returns {object} An object containing the require state handling
 * functions
 * NOTE: We separate the state from the component so we can have the state
 * passed down to the Rest Timer UI component so that it will persist after
 * the UI component has unmounted (for example if the user jumps to a different
 * page)
 */
const useRestTimer = () => {
    const [chosenTime, setChosenTime] = useState(initialRestTime);
    const [remainingTime, setRemainingTime] = useState(initialRestTime);
    const [isActive, setIsActive] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    const handleTimeAdded = () => {
        if (remainingTime < maxRestTimerDurationInSeconds - timeAdjustmentInSeconds) {
            setChosenTime((prevTime) => prevTime + timeAdjustmentInSeconds);
            setRemainingTime((prevTime) => prevTime + timeAdjustmentInSeconds);
        }
    };

    const handleTimeSubtracted = () => {
        if (remainingTime > timeAdjustmentInSeconds) {
            setChosenTime((prevTime) => prevTime - timeAdjustmentInSeconds);
            setRemainingTime((prevTime) => prevTime - timeAdjustmentInSeconds);
        }
    };

    return {
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
    };
};

export default useRestTimer;
