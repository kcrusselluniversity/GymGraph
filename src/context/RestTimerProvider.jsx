import useRestTimer from "../hooks/useRestTimer";
import { RestTimerContext } from "./appContext";
import useCountdown from "../hooks/useCountdown";
import { node } from "prop-types";

/**
 * Context Provider to share rest timer state throughout the app
 * 
 * @param {object} children: The component that is being wrapped
 * @returns A Provider for the rest timer context
 */
const RestTimerProvider = ({ children }) => {
    const restTimerState = useRestTimer();

    // Destructure required attributes of the rest timers state to use 
    // in setting up the countdown functionality
    const {
        remainingTime,
        setRemainingTime,
        isActive,
        setIsActive,
        isFinished,
        setIsFinished,
    } = restTimerState;

    // use the Countdown custom hook to simulate counting down every second
    useCountdown(
        isActive,
        setIsActive,
        remainingTime,
        setRemainingTime,
        isFinished,
        setIsFinished
    );

    return (
        <RestTimerContext.Provider value={restTimerState}>
            {children}
        </RestTimerContext.Provider>
    );
};

RestTimerProvider.propTypes = {
    children: node,
};

export default RestTimerProvider;
