import { node } from "prop-types";
import { historyContext } from "./appContext";
import { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { collection, query, getDocs } from "firebase/firestore";

/**
 * History Provider
 *
 * This context is used to fetch a users exercise history on mount
 * of the component it wraps. This is used to wrap a page component
 * (eg the Dashboard page or History page) so that every time the page renders
 * it updates the userHistory and provides this to all descendant components.
 */
const HistoryProvider = ({ children }) => {
    const [userHistory, setUserHistory] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Update the userHistory state everytime the wrapped component
    // rerenders
    useEffect(() => {
        const fetchUserHistory = async () => {
            try {
                const userUid = auth.currentUser.uid;
                let userHistoryArray = [];

                // Query db for this users exercise history
                const q = query(
                    collection(db, `users/${userUid}/exerciseHistory`)
                );
                const historySnapshot = await getDocs(q);

                // Parse user history
                historySnapshot.forEach((doc) =>
                    userHistoryArray.push(doc.data())
                );

                // Convert firestore Timestamp objects to Date objects
                userHistoryArray.forEach((session) => {
                    const { startTime, exercises } = session;
                    // Convert session startTime to Date object
                    session["startTime"] = startTime.toDate();

                    // Loop over each exercise in the session and convert
                    // the timestamps to Date objects
                    Object.values(exercises).forEach((exercise) => {
                        const { uid, startTime } = exercise;
                        session["exercises"][uid]["startTime"] =
                            startTime.toDate();
                    });
                });

                // Filter out any dates after todays date
                const today = new Date();

                // Set time to 11:59:59 pm
                today.setHours(23, 59, 59);

                userHistoryArray = userHistoryArray.filter(
                    (session) => session.startTime < today
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

    return (
        <historyContext.Provider value={{ isLoading, userHistory }}>
            {children}
        </historyContext.Provider>
    );
};

HistoryProvider.propTypes = {
    children: node,
};

export default HistoryProvider;
