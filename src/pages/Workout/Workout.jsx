import useLocalStorage from "../../hooks/useLocalStorage";
import StartWorkoutButton from "./components/StartWorkoutButton";
import ExerciseSession from "./components/ExerciseSession";
import { v4 as uuid } from "uuid";
import "./workout.css";

const Workout = () => {
    const [workoutActive, setWorkout, removeWorkout] = useLocalStorage(
        "isWorkoutActive",
        false
    );
    const [sessionId, setSessionId , removeSessionId] = useLocalStorage("sessionId", null);

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
                }}
            >
                Remove
            </button>
            <button onClick={() => setWorkout(!workoutActive)}>Toggle</button>
            {workoutActive ? (
                <ExerciseSession sessionId={sessionId} />
            ) : (
                <StartWorkoutButton handleClick={handleClick} />
            )}
        </div>
    );
};

export default Workout;
