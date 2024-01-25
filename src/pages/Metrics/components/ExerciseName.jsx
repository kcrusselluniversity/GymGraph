import { func, string } from "prop-types";

const ExerciseName = ({ exerciseName, onClick=()=>{} }) => {
    return (
        <div
            className="exerciseGroupList__item"
            data-testid="exerciseNameItem"
            onClick={() => onClick()}
        >
            {exerciseName}
        </div>
    );
};

ExerciseName.propTypes = {
    exerciseName: string,
    onClick: func,
};

export default ExerciseName;
