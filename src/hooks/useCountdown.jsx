import { useEffect } from "react";

const useCountdown = (isActive, setIsActive, remainingTime, setRemainingTime, isFinished, setIsFinished) => {
    useEffect(() => {
        let timer; 
        if (isActive & !isFinished && remainingTime > 0) {
            // Remove one second from the remaining time after every second
            timer = setInterval(() => setRemainingTime((prevTime) => prevTime - 1), 1000);
        }

        if (remainingTime == 0) {
            clearInterval(timer)
            setIsFinished(true)
            setIsActive(false)
        }

        return () => clearInterval(timer)
    }, [isActive, remainingTime]);
};

export default useCountdown;
