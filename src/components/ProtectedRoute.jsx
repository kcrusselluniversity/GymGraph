import { Navigate, Outlet } from "react-router-dom";
import { node, bool, string } from "prop-types";

/**
 * Wrapper for a route element (ie a page) to add authentication
 * requirements for that page
 *
 * @param {boolean} isAuthorised: whether the user is allowed to access that path
 * @param {string} redirectPath: path to redirect if user does not have access
 * @param {object} children: component to render if access allowed
 *
 * Acknowledgement:
 * Thanks to Robin Wieruch's article 'React Router 6: Private Routes'
 * that shows how to best implement a protected route
 * URL: https://www.robinwieruch.de/react-router-private-routes/
 */
const ProtectedRoute = ({ isAuthorised, redirectPath, children }) => {
    if (!isAuthorised) {
        return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet />;
};

ProtectedRoute.propTypes = {
    isAuthorised: bool.isRequired,
    redirectPath: string,
    children: node,
};

export default ProtectedRoute;
