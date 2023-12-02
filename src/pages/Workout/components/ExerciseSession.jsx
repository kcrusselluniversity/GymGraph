import { string } from "prop-types";
import AddExerciseButton from "./AddExerciseButton";
import RestTimerButton from "./RestTimerButton";
import ExerciseItem from "./ExerciseItem";

const exercise = {
    name: "pushing up forever",
    sets: [
        { weight: 20, reps: 10 },
        { weight: 20, reps: 9 },
        { weight: 20, reps: 8 },
    ],
};

const ExerciseSession = (props) => {
    return <div className="exerciseSession">
        <AddExerciseButton />
        <ExerciseItem exercise={exercise}/>
        <RestTimerButton />
    </div>;
};

ExerciseSession.propTypes = {
    sessionId: string,
}

export default ExerciseSession;
