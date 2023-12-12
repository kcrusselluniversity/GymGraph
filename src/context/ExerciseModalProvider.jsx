import { useEffect, useState } from "react";
import { exerciseModalContext } from "./exerciseModalContext";
import { node } from "prop-types";
import { TEST_EXERCISE_LIST } from "../data/constants";
import useLocalStorage from "../hooks/useLocalStorage";

/**
 * Context Provider to share the related state of the exercise modal component
 *
 * @param {object} children: The component that is being wrapped
 * @returns A Provider for the exercise modal context
 */
const ExerciseModalProvider = ({ children }) => {
    const [exerciseModalState, setExerciseModalState] = useState("default");
    const [workoutActive, setWorkout, removeWorkout] = useLocalStorage(
        "isWorkoutActive",
        false
    );
    const [sessionId, setSessionId, removeSessionId] = useLocalStorage(
        "sessionId",
        null
    );
    const [sessionExercises, setSessionExercises, removeExercises] =
        useLocalStorage("sessionExercises", TEST_EXERCISE_LIST);
    const [searchInput, setSearchInput] = useState("");
    const [selectedExerciseInfo, setSelectedExerciseInfo] = useState(null);
    const [exerciseAdded, setExerciseAdded] = useState(null);

    useEffect(() => {
        if (searchInput != "") setExerciseModalState("user_search");
    }, [searchInput]);

    const sharedState = {
        exerciseModalState,
        setExerciseModalState,
        workoutActive,
        setWorkout,
        removeWorkout,
        sessionId,
        setSessionId,
        removeSessionId,
        sessionExercises,
        setSessionExercises,
        removeExercises,
        searchInput,
        setSearchInput,
        selectedExerciseInfo,
        setSelectedExerciseInfo,
        exerciseAdded,
        setExerciseAdded,
    };
    return (
        <exerciseModalContext.Provider value={sharedState}>
            {children}
        </exerciseModalContext.Provider>
    );
};

ExerciseModalProvider.propTypes = {
    children: node,
};

export default ExerciseModalProvider;
