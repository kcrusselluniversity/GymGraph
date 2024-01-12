import StartWorkoutButton from "./components/StartWorkoutButton";
import ExerciseSession from "./components/ExerciseSession";
import { exerciseModalContext } from "../../context/exerciseModalContext";
import { useContext } from "react";
import { SessionExercises } from "../../utils/classes/SessionExercises";
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
        setSessionExercises
    } = useContext(exerciseModalContext);

    const handleClick = () => {
        setWorkoutActive(true);
        setSessionStartTime(new Date());
        setSessionExercises(new SessionExercises())
    };

    return (
        <div className="workoutPage userPageGrid">
            <div className="workoutPage__content">
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
