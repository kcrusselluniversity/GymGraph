import StartWorkoutButton from "./components/StartWorkoutButton";
import ExerciseSession from "./components/ExerciseSession";
import { exerciseModalContext } from "../../context/exerciseModalContext";
import { useContext } from "react";
import { v4 as uuid } from "uuid";
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
        setWorkout,
        setSessionId,
        setSessionExercises
    } = useContext(exerciseModalContext);

    const handleClick = () => {
        setWorkout(true);
        setSessionId(uuid());
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
