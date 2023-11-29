import { string } from "prop-types";
import AddExerciseButton from "./AddExerciseButton";

const ExerciseSession = (props) => {
    return <div className="exerciseSession">
        <AddExerciseButton />
    </div>;
};

ExerciseSession.propTypes = {
    sessionId: string,
}

export default ExerciseSession;
