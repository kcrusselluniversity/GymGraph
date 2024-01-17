import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "./appContext";
import { auth } from "../config/firebase";
import { node } from "prop-types";

/**
 * Context Provider to share global state of user
 * 
 * @param {object} children: The component that is being wrapped
 * @returns A Provider for the user auth context
 */
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setisLoading] = useState(true);

    useEffect(() => {
        // Set up firebase auth listener on mount
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setisLoading(false);
        });

        // Clean up listener on unmount
        return unsubscribe;
    }, []);

    return <AuthContext.Provider value={{user, isLoading}}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
    children: node,
};

export default AuthProvider;
