import { Dialog } from "@mui/material";
import SessionHistorySummary from "../../components/ui/SessionHistorySummary";
import Calendar from "./components/Calendar";
import { useContext } from "react";
import { dashboardContext } from "../../context/DashboardContext";
import VolumePerSessionGraph from "./components/VolumePerSessionGraph";
import MuscleGroupPieChart from "./components/MuscleGroupPieChart";
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
            <h2>Welcome, </h2>
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
