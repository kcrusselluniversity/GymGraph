import { useState } from "react";
import { node } from "prop-types";
import { dashboardContext } from "./DashboardContext";

const DashboardProvider = ({ children }) => {
    const [selectedDateHistory, setSelectedDateHistory] = useState(null);
    const [isSelectedDateModalOpen, setIsSelectedDateModalOpen] =
        useState(false);

    const sharedState = {
        selectedDateHistory,
        setSelectedDateHistory,
        isSelectedDateModalOpen,
        setIsSelectedDateModalOpen,
    };

    return (
        <dashboardContext.Provider value={sharedState}>
            {children}
        </dashboardContext.Provider>
    );
};

DashboardProvider.propTypes = {
    children: node,
};

export default DashboardProvider;
