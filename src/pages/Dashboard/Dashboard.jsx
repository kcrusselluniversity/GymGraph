import { Dialog } from "@mui/material";
import SessionHistorySummary from "../../components/ui/SessionHistorySummary";
import Calendar from "./components/Calendar";
import { useContext } from "react";
import { dashboardContext } from "../../context/appContext";
import MuscleGroupPieChart from "./components/MuscleGroupPieChart";
import VolumePerSessionGraph from "./components/VolumePerSessionGraph";
import "./dashboard.css";

const Dashboard = () => {
    const {
        selectedDateHistory,
        isSelectedDateModalOpen,
        setIsSelectedDateModalOpen,
    } = useContext(dashboardContext);

    const handleSelectedDateModalClose = () =>
        setIsSelectedDateModalOpen(false);

    return (
        <div className="dashboardPage userPageGrid">
            <h1 className="UserPage__title">Dashboard</h1>
            <div className="dashboard__content">
                <Calendar />
                <MuscleGroupPieChart />
                <VolumePerSessionGraph />
            </div>
            <Dialog
                open={isSelectedDateModalOpen}
                onClose={handleSelectedDateModalClose}
            >
                <div className="SessionHistorySummaryModal">
                    <SessionHistorySummary
                        sessionObject={selectedDateHistory}
                    />
                </div>
            </Dialog>
        </div>
    );
};

export default Dashboard;
