import { useContext, useEffect, useState } from "react";
import GreyButton from "../../../components/ui/GreyButton";
import ExerciseName from "./ExerciseName";
import { object } from "prop-types";
import { historyContext } from "../../../context/historyContext";
import getMostRecentExercises from "../utils/getMostRecentExercises";

const MostRecentExercises = ({ state }) => {
    const { setSearchInput, isMostRecentOpen, setIsMostRecentOpen } = state;
    const { userHistory, isLoading } = useContext(historyContext);
    const [mostRecentExercises, setMostRecentExercises] = useState([]);

    // Parse userHistory once loaded to determine most recent exercises
    useEffect(() => {
        if (!isLoading) {
            const mostRecentExercises = getMostRecentExercises(userHistory);
            setMostRecentExercises(mostRecentExercises);
        }
    }, [userHistory]);

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
                    {mostRecentExercises.map((exercise, index) => (
                        <ExerciseName
                            key={`exercise-${index}`}
                            exerciseName={exercise.name}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

MostRecentExercises.propTypes = {
    state: object,
};

export default MostRecentExercises;
