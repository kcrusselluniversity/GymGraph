import useLocalStorage from "../../hooks/useLocalStorage";
import StartWorkoutButton from "./components/StartWorkoutButton";
import ExerciseSession from "./components/ExerciseSession";
import { v4 as uuid } from "uuid";
import { TEST_EXERCISE_LIST } from "../../data/constants";
import ExerciseModalProvider from "../../context/exerciseModalProvider";
import "./workout.css";

/**
 * Workout page component
 *  
 */
const Workout = () => {
    const [workoutActive, setWorkout, removeWorkout] = useLocalStorage(
        "isWorkoutActive",
        false
    );
    const [sessionId, setSessionId , removeSessionId] = useLocalStorage("sessionId", null);
    const [sessionExercises, setSessionExercises, removeExercises] = useLocalStorage(
        "sessionExercises",
        TEST_EXERCISE_LIST
    );

    const handleClick = () => {
        setWorkout(true);
        setSessionId(uuid());
    };

    return (
        <ExerciseModalProvider>
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
                    <ExerciseSession sessionExercises={sessionExercises} setSessionExercises={setSessionExercises}/>
                ) : (
                    <StartWorkoutButton handleClick={handleClick} />
                )}
            </div>
        </ExerciseModalProvider>
    );
};

export default Workout;
