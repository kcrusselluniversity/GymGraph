import { useEffect, useState } from "react";
import { exerciseModalContext } from "./exerciseModalContext";
import { node } from "prop-types";

/**
 * Context Provider to share the related state of the exercise modal component
 *
 * @param {object} children: The component that is being wrapped
 * @returns A Provider for the exercise modal context
 */
const ExerciseModalProvider = ({ children }) => {
    const [exerciseModalState, setExerciseModalState] = useState("default");
    const [searchInput, setSearchInput] = useState("");
    const [selectedExerciseInfo, setSelectedExerciseInfo] = useState(null);

    useEffect(() => {
        if (searchInput != "") setExerciseModalState("user_search");
    }, [searchInput]);

    const state = {
        exerciseModalState,
        setExerciseModalState,
        searchInput,
        setSearchInput,
        selectedExerciseInfo,
        setSelectedExerciseInfo,
    };
    return (
        <exerciseModalContext.Provider value={state}>
            {children}
        </exerciseModalContext.Provider>
    );
};

ExerciseModalProvider.propTypes = {
    children: node,
};

export default ExerciseModalProvider;
