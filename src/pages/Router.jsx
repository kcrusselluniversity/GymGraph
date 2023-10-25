import { Route, Routes } from "react-router-dom";
import Landing from "./Landing";
import Signin from "./Signin";
import Signup from "./Signup";
import User from "./User";
import Workout from "./Workout";
import History from "./History";
import Metrics from "./Metrics";
import Profile from "./Profile";
import NavBar from "../components/NavBar";
import Error from "./Error"

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/user" element={<NavBar />}>
                <Route index element={<User />} />
                <Route path="workout" element={<Workout />} />
                <Route path="history" element={<History />} />
                <Route path="metrics" element={<Metrics />} />
                <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<Error />} />
        </Routes>
    );
};

export default Router;
