import { string } from "prop-types";

const ExerciseName = ({ exerciseName }) => {
    return (
        <div
            className="exerciseGroupList__item"
            data-testid="exerciseNameItem"
        >
            {exerciseName}
        </div>
    );
};

ExerciseName.propTypes = {
    exerciseName: string,
};

export default ExerciseName;
