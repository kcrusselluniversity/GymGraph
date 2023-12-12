import StartWorkoutButton from "./components/StartWorkoutButton";
import ExerciseSession from "./components/ExerciseSession";
import { v4 as uuid } from "uuid";
import "./workout.css";
import { exerciseModalContext } from "../../context/exerciseModalContext";
import { useContext } from "react";

/**
 * Workout page component
 *
 */
const Workout = () => {
    // Destructure the Exercise modals context state
    const {
        workoutActive,
        setWorkout,
        removeWorkout,
        sessionId,
        setSessionId,
        removeSessionId,
        sessionExercises,
        setSessionExercises,
        removeExercises,
    } = useContext(exerciseModalContext);

    const handleClick = () => {
        setWorkout(true);
        setSessionId(uuid());
    };

    return (
        <div className="workoutPage">
            <button
                onClick={() => {
                    removeWorkout();
                    removeSessionId();
                    removeExercises();
                }}
            >
                Remove
            </button>
            <button onClick={() => setWorkout(!workoutActive)}>Toggle</button>
            {workoutActive ? (
                <ExerciseSession
                    sessionExercises={sessionExercises}
                    setSessionExercises={setSessionExercises}
                />
            ) : (
                <StartWorkoutButton handleClick={handleClick} />
            )}
        </div>
    );
};

export default Workout;
