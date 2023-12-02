import useLocalStorage from "../../hooks/useLocalStorage";
import StartWorkoutButton from "./components/StartWorkoutButton";
import ExerciseSession from "./components/ExerciseSession";
import { v4 as uuid } from "uuid";
import "./workout.css";

import { TEST_EXERCISE_LIST } from "../../data/constants";

const Workout = () => {
    const [workoutActive, setWorkout, removeWorkout] = useLocalStorage(
        "isWorkoutActive",
        false
    );
    const [sessionId, setSessionId , removeSessionId] = useLocalStorage("sessionId", null);
    const [exercises, setExercises, removeExercises] = useLocalStorage(
        uuid(),
        TEST_EXERCISE_LIST
    );

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
                <ExerciseSession exercises={exercises} setExercises={setExercises}/>
            ) : (
                <StartWorkoutButton handleClick={handleClick} />
            )}
        </div>
    );
};

export default Workout;
