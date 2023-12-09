import { useState } from "react";
import {
    TIME_ADJUSTMENT_IN_SECONDS,
    MAX_REST_TIMER_DURATION_IN_SECONDS,
    INITIAL_REST_TIME,
} from "../data/constants";

/**
 * useRestTimer is a custom hook used to manage the state of the Rest Timer 
 * component. It has state for the time as chosen by the user, the time 
 * remaining, as well as state to manage when the timer is active and when 
 * it is finished.
 * 
 * @returns {object} An object containing the required state and handling 
 * functions for the Rest Timer component.
 * 
 * NOTE: We separate the state from the component so we can have the state
 * passed down to the Rest Timer UI component so that it will persist after
 * the UI component has unmounted (for example if the user goes to a different
 * page then comes back).
 */
const useRestTimer = () => {
    const [chosenTime, setChosenTime] = useState(INITIAL_REST_TIME);
    const [remainingTime, setRemainingTime] = useState(INITIAL_REST_TIME);
    const [isActive, setIsActive] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    const handleTimeAdded = () => {
        if (remainingTime < MAX_REST_TIMER_DURATION_IN_SECONDS - TIME_ADJUSTMENT_IN_SECONDS) {
            setChosenTime((prevTime) => prevTime + TIME_ADJUSTMENT_IN_SECONDS);
            setRemainingTime((prevTime) => prevTime + TIME_ADJUSTMENT_IN_SECONDS);
        }
    };

    const handleTimeSubtracted = () => {
        if (remainingTime > TIME_ADJUSTMENT_IN_SECONDS) {
            setChosenTime((prevTime) => prevTime - TIME_ADJUSTMENT_IN_SECONDS);
            setRemainingTime((prevTime) => prevTime - TIME_ADJUSTMENT_IN_SECONDS);
        }
    };

    return {
        chosenTime,
        setChosenTime,
        remainingTime,
        setRemainingTime,
        isActive,
        setIsActive,
        isFinished,
        setIsFinished,
        handleTimeAdded,
        handleTimeSubtracted,
    };
};

export default useRestTimer;
