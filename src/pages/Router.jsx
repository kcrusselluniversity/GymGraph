import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/appContext";
import Landing from "./Landing";
import Signin from "./Signin";
import Signup from "./Signup";
import Workout from "./Workout";
import History from "./History";
import Metrics from "./Metrics";
import Profile from "./Profile";
import Dashboard from "./Dashboard";
import Error from "./Error";
import UnderConstruction from "./UnderConstruction";
import UserPageLayout from "./UserPageLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import Loading from "../components/ui/Loading";
import ExerciseModalProvider from "../context/ExerciseModalProvider";
import DashboardProvider from "../context/DashboardProvider";
import HistoryProvider from "../context/HistoryProvider";
import MetricsProvider from "../context/MetricsProvider";

/**
 * Router component
 *
 * The `Router` component is responsible for defining the routes of the site
 * using React Router. It organizes the site's navigation structure and renders
 * the appropriate components for each route.
 *
 * Creating a separate component to house the routes results in more
 * readable code.
 */
const Router = () => {
    const { user, isLoading } = useContext(AuthContext);

    if (isLoading) return <Loading></Loading>;

    return (
        <Routes>
            <Route
                path="/"
                element={user ? <Navigate to="/user" /> : <Landing />}
            />
            <Route
                path="/signin"
                element={user ? <Navigate to="/user" /> : <Signin />}
            />
            <Route
                path="/signup"
                element={user ? <Navigate to="/user" /> : <Signup />}
            />
            <Route
                element={
                    <ProtectedRoute
                        isAuthorised={Boolean(user)}
                        redirectPath="/"
                    />
                }
            >
                <Route path="/user" element={<UserPageLayout />}>
                    <Route
                        index
                        element={<Navigate to="dashboard" replace />}
                    />
                    <Route
                        path="dashboard"
                        element={
                            <DashboardProvider>
                                <HistoryProvider>
                                    <Dashboard />
                                </HistoryProvider>
                            </DashboardProvider>
                        }
                    />
                    <Route
                        path="workout"
                        element={
                            <ExerciseModalProvider>
                                <Workout />
                            </ExerciseModalProvider>
                        }
                    />
                    <Route path="history" element={<History />} />
                    <Route
                        path="metrics"
                        element={
                            <MetricsProvider>
                                <HistoryProvider>
                                    <Metrics />
                                </HistoryProvider>
                            </MetricsProvider>
                        }
                    />
                    <Route path="profile" element={<Profile />} />
                </Route>
            </Route>
            <Route path="underConstruction" element={<UnderConstruction />} />
            <Route path="*" element={<Error />} />
        </Routes>
    );
};

export default Router;
