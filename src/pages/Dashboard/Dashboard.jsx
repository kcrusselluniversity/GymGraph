import Calendar from "./components/Calendar";
import './dashboard.css'

const Dashboard = () => {
    return (
        <>
            <h1>Dashboard</h1>
            <div className="dashboard__content">
                <Calendar />
                {/* <History /> */}
                {/* <SetsGraph /> */}
            </div>
        </>
    );
};

export default Dashboard;
