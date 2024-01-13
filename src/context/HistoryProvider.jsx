import { node } from "prop-types";
import { historyContext } from "./historyContext";
import { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { collection, query, getDocs } from "firebase/firestore";

const HistoryProvider = ({ children }) => {
    const [userHistory, setUserHistory] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Update the userHistory state everytime the wrapped component
    // rerenders
    useEffect(() => {
        const fetchUserHistory = async () => {
            try {
                const userUid = auth.currentUser.uid;
                const userHistoryArray = [];

                // Query db for this users exercise history
                const q = query(
                    collection(db, `users/${userUid}/exerciseHistory`)
                );
                const historySnapshot = await getDocs(q);

                // Parse user history
                historySnapshot.forEach((doc) =>
                    userHistoryArray.push(doc.data())
                );

                // Update state
                setUserHistory(userHistoryArray);
            } catch (err) {
                console.error("Error fetching userHistory", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserHistory();
    }, []);

    return <historyContext.Provider value>{children}</historyContext.Provider>;
};

HistoryProvider.propTypes = {
    children: node,
};

export default HistoryProvider;
