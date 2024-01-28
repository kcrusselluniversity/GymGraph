import StartWorkoutButton from "./components/StartWorkoutButton";
import ExerciseSession from "./components/ExerciseSession";
import { exerciseModalContext } from "../../context/appContext";
import { useContext } from "react";
import { SessionExercises } from "../../utils/classes/SessionExercises";
import ScrollToTopOnLoad from "../../components/ui/ScrollToTopOnLoad";
import "./workout.css";

/**
 * Workout page component
 *
 */
const Workout = () => {
    // Destructure the Exercise modals context state
    const {
        workoutActive,
        setWorkoutActive,
        setSessionStartTime,
        setSessionExercises,
    } = useContext(exerciseModalContext);

    const handleClick = () => {
        setWorkoutActive(true);
        setSessionStartTime(new Date());
        setSessionExercises(new SessionExercises());
    };

    return (
        <div className="workoutPage userPageGrid">
            <div className="workoutPage__content">
                <ScrollToTopOnLoad />
                {workoutActive ? (
                    <ExerciseSession />
                ) : (
                    <StartWorkoutButton handleClick={handleClick} />
                )}
            </div>
        </div>
    );
};

export default Workout;
