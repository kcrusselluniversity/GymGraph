import StartWorkoutButton from "./components/StartWorkoutButton";
import ExerciseSession from "./components/ExerciseSession";
import { exerciseModalContext } from "../../context/exerciseModalContext";
import { useContext } from "react";
import { v4 as uuid } from "uuid";
import "./workout.css";

/**
 * Workout page component
 *
 */
const Workout = () => {
    // Destructure the Exercise modals context state
    const {
        workoutActive,
        setWorkout,
        setSessionId
    } = useContext(exerciseModalContext);

    const handleClick = () => {
        setWorkout(true);
        setSessionId(uuid());
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
