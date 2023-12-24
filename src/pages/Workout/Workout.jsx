import StartWorkoutButton from "./components/StartWorkoutButton";
import ExerciseSession from "./components/ExerciseSession";
import { exerciseModalContext } from "../../context/exerciseModalContext";
import { useContext } from "react";
import "./workout.css";
import { SessionExercises } from "../../utils/classes/SessionExercises";

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
        setSessionExercises
    } = useContext(exerciseModalContext);

    const handleClick = () => {
        setWorkoutActive(true);
        setSessionStartTime(new Date());
        setSessionExercises(new SessionExercises())
    };

    return (
        <div className="workoutPage">
            {workoutActive ? (
                <ExerciseSession />
            ) : (
                <StartWorkoutButton handleClick={handleClick} />
            )}
        </div>
    );
};

export default Workout;
