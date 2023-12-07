import { string } from "prop-types";
/**
 * ExerciseNameItem component
 *
 * Takes in an exercise name and returns a UI component displaying the exercise
 */
const ExerciseNameItem = ({ exerciseName }) => {
    return (
        <div className="exerciseGroupList__item" data-testid="exerciseNameItem">
            {exerciseName}
        </div>
    );
};

ExerciseNameItem.propTypes = {
    exerciseName: string,
};

export default ExerciseNameItem;
