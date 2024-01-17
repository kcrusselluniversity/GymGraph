import GreyButton from "../../../components/ui/GreyButton";
import ExerciseName from "./ExerciseName";
import { object } from "prop-types";

const MostRecentExercises = ({ state }) => {
    const { setSearchInput, isMostRecentOpen, setIsMostRecentOpen } = state;

    const handleBtnClick = () => {
        setIsMostRecentOpen(!isMostRecentOpen);
        setSearchInput("");
    };
    return (
        <div className="mostRecentComponent">
            <GreyButton
                className="mostRecentComponent__btn"
                handleClick={handleBtnClick}
            >
                <span>Most Recent</span>
            </GreyButton>
            {isMostRecentOpen && (
                <div className="mostRecentComponent__results resultsContainer">
                    <ExerciseName exerciseName="hi" />
                    <ExerciseName exerciseName="hi" />
                    <ExerciseName exerciseName="hi" />
                    <ExerciseName exerciseName="hi" />
                    <ExerciseName exerciseName="hi" />
                    <ExerciseName exerciseName="hi" />
                    <ExerciseName exerciseName="hi" />
                </div>
            )}
        </div>
    );
};

MostRecentExercises.propTypes = {
    state: object,
};

export default MostRecentExercises;
