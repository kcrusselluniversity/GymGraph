import { metricsContext } from "./appContext";
import { useState } from "react";
import { node } from "prop-types";

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
    const [isGifLoading, setIsGifLoading] = useState(true);

    const state = {
        searchInput,
        setSearchInput,
        isMostRecentOpen,
        setIsMostRecentOpen,
        selectedExercise,
        setSelectedExercise,
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
