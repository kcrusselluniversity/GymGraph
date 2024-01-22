import { historyContext, metricsContext } from "./appContext";
import { useContext, useEffect, useState } from "react";
import { node } from "prop-types";
import calculateSelectedExerciseData from "../pages/Metrics/utils/calculateSelectedExerciseData";

/**
 * Metrics Provider to share global state of metrics page
 *
 * @param {object} children: The component that is being wrapped
 * @returns A Provider for the metrics context
 */
const MetricsProvider = ({ children }) => {
    const [searchInput, setSearchInput] = useState("");
    const [isMostRecentOpen, setIsMostRecentOpen] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [selectedExerciseData, setSelectedExerciseData] = useState([]);
    const [isGifLoading, setIsGifLoading] = useState(true);

    const { userHistory, isLoading } = useContext(historyContext);

    useEffect(() => {
        if (!isLoading && selectedExercise != null) {
            const selectedExerciseData = calculateSelectedExerciseData(
                selectedExercise,
                userHistory
            );

            setSelectedExerciseData(selectedExerciseData);
        }
    }, [isLoading, selectedExercise, userHistory]);

    const state = {
        searchInput,
        setSearchInput,
        isMostRecentOpen,
        setIsMostRecentOpen,
        selectedExercise,
        setSelectedExercise,
        selectedExerciseData,
        isGifLoading,
        setIsGifLoading,
    };

    return (
        <metricsContext.Provider value={state}>
            {children}
        </metricsContext.Provider>
    );
};

MetricsProvider.propTypes = {
    children: node,
};

export default MetricsProvider;
