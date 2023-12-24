import { useEffect, useState } from "react";
import { exerciseModalContext } from "./exerciseModalContext";
import { node } from "prop-types";
import useLocalStorage from "../hooks/useLocalStorage";
import { SessionExercises } from "../utils/classes/SessionExercises";

/**
 * Context Provider to share the related state of the exercise modal component.
 *
 * @param {object} children: The component that is being wrapped.
 * @returns A Provider for the exercise modal context.
 */
const ExerciseModalProvider = ({ children }) => {
    // Top level exercise modal state
    const [exerciseModalState, setExerciseModalState] = useState("default");
    const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);
    const [workoutActive, setWorkoutActive, removeWorkoutActive] = useLocalStorage(
        "isWorkoutActive",
        false
    );
    const [sessionStartTime, setSessionStartTime, removeSessionStartTime] =
        useLocalStorage("sessionStartTime", null);
    const [sessionExercises, setSessionExercises, removeSessionExercises] =
        useLocalStorage("sessionExercises", {}, SessionExercises);

    // Search bar state
    const [searchInput, setSearchInput] = useState("");

    // State to track a users path through the exercise selection portion
    // of the modal
    const [selectedExerciseInfo, setSelectedExerciseInfo] = useState(null);
    const [exerciseAdded, setExerciseAdded] = useState(null);
    const [isExerciseItemSelected, setIsExerciseItemSelected] = useState(false);

    useEffect(() => {
        if (searchInput != "") setExerciseModalState("user_search");
    }, [searchInput]);

    const sharedState = {
        exerciseModalState,
        setExerciseModalState,
        workoutActive,
        setWorkoutActive,
        removeWorkoutActive,
        sessionStartTime,
        setSessionStartTime,
        removeSessionStartTime,
        sessionExercises,
        setSessionExercises,
        removeSessionExercises,
        searchInput,
        setSearchInput,
        selectedExerciseInfo,
        setSelectedExerciseInfo,
        exerciseAdded,
        setExerciseAdded,
        isExerciseItemSelected,
        setIsExerciseItemSelected,
        isExerciseModalOpen,
        setIsExerciseModalOpen,
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
