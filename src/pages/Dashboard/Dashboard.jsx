import { Dialog } from "@mui/material";
import SessionHistorySummary from "../../components/ui/SessionHistorySummary";
import Calendar from "./components/Calendar";
import { useContext } from "react";
import { dashboardContext } from "../../context/DashboardContext";
import HistoryProvider from "../../context/HistoryProvider";
import "./dashboard.css";

const Dashboard = () => {
    const { selectedDateHistory, isSelectedDateModalOpen, setIsSelectedDateModalOpen } =
        useContext(dashboardContext);

    const handleSelectedDateModalClose = () =>
        setIsSelectedDateModalOpen(false);

    return (
        <HistoryProvider>
            <div className="dashboardPage userPageGrid">
                <h2>Welcome, </h2>
                <div className="dashboard__content">
                    <Calendar />
                    {/* <MuscleGroupHistory /> */}
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
            </div>
        </HistoryProvider>
    );
};

export default Dashboard;
