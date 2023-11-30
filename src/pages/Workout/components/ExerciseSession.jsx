import { string } from "prop-types";
import AddExerciseButton from "./AddExerciseButton";
import RestTimerButton from "./RestTimerButton";
import ExerciseItem from "./ExerciseItem";

const ExerciseSession = (props) => {
    return <div className="exerciseSession">
        <AddExerciseButton />
        <ExerciseItem />
        <RestTimerButton />
    </div>;
};

ExerciseSession.propTypes = {
    sessionId: string,
}

export default ExerciseSession;
