import { useEffect, useState } from "react";
import { node } from "prop-types";
import { dashboardContext } from "./appContext";

const DashboardProvider = ({ children }) => {
    const [selectedDateHistory, setSelectedDateHistory] = useState(null);
    const [isSelectedDateModalOpen, setIsSelectedDateModalOpen] =
        useState(false);
    
    useEffect(() => {
        if(selectedDateHistory === null) return;

        setIsSelectedDateModalOpen(true);
    }, [selectedDateHistory])

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
