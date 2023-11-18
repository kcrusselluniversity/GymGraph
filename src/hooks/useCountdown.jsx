import { useEffect } from "react";

/**
 * useCountdown is a custom React hook that provides countdown timer
 * functionality.
 * It decrements the remaining time every second when the timer is active and
 * not finished, and handles the timer state transitions upon completion.
 *
 * @param {boolean} isActive: A boolean state indicating whether the countdown
 * is currently active.
 * @param {function} setIsActive: A function to update the isActive state.
 * @param {number} remainingTime: A number state representing the remaining
 * time in seconds for the countdown.
 * @param {function} setRemainingTime: A function to update the remainingTime
 * state.
 * @param {boolean} isFinished: A boolean state indicating whether the
 * countdown has finished.
 * @param {function} setIsFinished: A function to update the isFinished state.
 *
 * Usage
 * This hook should be used in components that require countdown timer
 * functionality. When the countdown is active (isActive is true), and it is
 * not yet finished (isFinished is false), the remainingTime will decrement
 * every second. When remainingTime reaches zero, the countdown stops,
 * isFinished is set to true, and isActive is set to false.
 *
 */
const useCountdown = (
    isActive,
    setIsActive,
    remainingTime,
    setRemainingTime,
    isFinished,
    setIsFinished
) => {
    useEffect(() => {
        let timer;
        if (isActive & !isFinished && remainingTime > 0) {
            // Remove one second from the remaining time after every second
            timer = setInterval(
                () => setRemainingTime((prevTime) => prevTime - 1),
                1000
            );
        }

        if (remainingTime == 0) {
            clearInterval(timer);
            setIsFinished(true);
            setIsActive(false);
        }

        return () => clearInterval(timer);
    }, [isActive, remainingTime]);
};

export default useCountdown;
