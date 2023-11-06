import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import AuthContext from "./authContext";
import { auth } from "../config/firebase";
import { object } from "prop-types";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Set up firebase auth listener
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        // Clean up listener on unmount
        return unsubscribe;
    }, []);

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
    children: object,
};

export default AuthProvider;
