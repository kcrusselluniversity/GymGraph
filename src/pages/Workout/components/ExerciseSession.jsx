import AddExerciseButton from "./AddExerciseButton";
import RestTimerButton from "./RestTimerButton";
import ExerciseItem from "./ExerciseItem";
import { PropTypes, func, number, string } from "prop-types";

const ExerciseSession = ({ exercises, setExercises }) => {
    const exerciseItems = exercises?.map((exercise) => {
        return <ExerciseItem key={exercise.name} exercise={exercise} />;
    });

    return (
        <div className="exerciseSession">
            <AddExerciseButton />
            {exerciseItems}
            <RestTimerButton />
        </div>
    );
};

ExerciseSession.propTypes = {
    exercises: PropTypes.arrayOf(
        PropTypes.shape({
            name: string,
            sets: PropTypes.arrayOf(
                PropTypes.shape({
                    weight: number,
                    reps: number,
                })
            ),
        })
    ),
    setExercises: func,
};

export default ExerciseSession;
