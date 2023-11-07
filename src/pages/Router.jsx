import { Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
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

    if(isLoading) return <Loading></Loading>
    
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route
                element={
                    <ProtectedRoute
                        isAuthorised={Boolean(user)}
                        redirectPath="/"
                    />
                }
            >
                <Route path="/user" element={<UserPageLayout />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="workout" element={<Workout />} />
                    <Route path="history" element={<History />} />
                    <Route path="metrics" element={<Metrics />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="settings" element={<UnderConstruction />} />
                </Route>
            </Route>
            <Route path="underConstruction" element={<UnderConstruction />} />
            <Route path="*" element={<Error />} />
        </Routes>
    );
};

export default Router;
