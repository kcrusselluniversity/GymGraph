import { Dialog } from "@mui/material";
import SessionHistorySummary from "../../components/ui/SessionHistorySummary";
import Calendar from "./components/Calendar";
import { useContext } from "react";
import { dashboardContext } from "../../context/DashboardContext";
import "./dashboard.css";

const Dashboard = () => {
    const { selectedDateHistory, isSelectedDateModalOpen, setIsSelectedDateModalOpen } =
        useContext(dashboardContext);

    const handleSelectedDateModalClose = () =>
        setIsSelectedDateModalOpen(false);

    return (
        <>
            <h1>Dashboard</h1>
            <div className="dashboard__content">
                <Calendar />
                {/* <History /> */}
                {/* <SetsGraph /> */}
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
        </>
    );
};

export default Dashboard;
