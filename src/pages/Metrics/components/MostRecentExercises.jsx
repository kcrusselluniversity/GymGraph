import { useContext, useEffect, useState } from "react";
import GreyButton from "../../../components/ui/GreyButton";
import ExerciseName from "./ExerciseName";
import { object } from "prop-types";
import { historyContext, metricsContext } from "../../../context/appContext";
import getMostRecentExercises from "../utils/getMostRecentExercises";

/**
 * Most recent exercises component
 * 
 * MostRecentExercises is a React component designed to display a list of 
 * the most recent exercises from a user's exercise history. 
 * It utilizes context for state management and a custom utility function 
 * to determine the most recent exercises.
 */
const MostRecentExercises = () => {
    // Destructure required context
    const { userHistory, isLoading } = useContext(historyContext);
    const { setSearchInput, isMostRecentOpen, setIsMostRecentOpen } =
        useContext(metricsContext);
    
    // Set up components state
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
