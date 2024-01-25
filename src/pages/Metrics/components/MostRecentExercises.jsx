import { useContext, useEffect, useRef, useState } from "react";
import GreyButton from "../../../components/ui/GreyButton";
import ExerciseName from "./ExerciseName";
import { object } from "prop-types";
import { historyContext, metricsContext } from "../../../context/appContext";
import getMostRecentExercises from "../utils/getMostRecentExercises";
import useOutsideClick from "../../../hooks/useOutsideClick";

const NO_EXERCISES_MESSAGE = "You haven't completed any exercises yet";

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
    const {
        isMostRecentOpen,
        setIsMostRecentOpen,
        selectedExercise,
        setSelectedExercise,
        setIsGifLoading,
    } = useContext(metricsContext);

    // Set up components state
    const [mostRecentExercises, setMostRecentExercises] = useState([]);
    const ref = useRef(null);

    // Call custom hook to add event listener for clicks outside the results
    // container
    useOutsideClick(ref, () => setIsMostRecentOpen(false));

    // Parse userHistory once loaded to determine most recent exercises
    useEffect(() => {
        if (!isLoading) {
            const mostRecentExercises = getMostRecentExercises(userHistory);
            setMostRecentExercises(mostRecentExercises);
        }
    }, [userHistory]);

    const handleBtnClick = () => {
        setIsMostRecentOpen(!isMostRecentOpen);
    };

    const handleExerciseNameClick = (exercise) => () => {
        const { name, uid } = exercise;
        setIsMostRecentOpen(false);
        setSelectedExercise({ name, uid });
        if (selectedExercise?.uid != uid) {
            setIsGifLoading(true);
        }
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
                <div
                    className="mostRecentComponent__results resultsContainer"
                    ref={ref}
                >
                    {mostRecentExercises.map((exercise, index) => (
                        <ExerciseName
                            key={`exercise-${index}`}
                            exerciseName={exercise.name}
                            onClick={handleExerciseNameClick(exercise)}
                        />
                    ))}
                    {mostRecentExercises.length === 0 && (
                        <ExerciseName exerciseName={NO_EXERCISES_MESSAGE} />
                    )}
                </div>
            )}
        </div>
    );
};

MostRecentExercises.propTypes = {
    state: object,
};

export default MostRecentExercises;
