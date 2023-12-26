import { useContext } from "react";
import GreyButton from "../../../components/ui/GreyButton";
import { exerciseModalContext } from "../../../context/exerciseModalContext";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../config/firebase";

/**
 * FinishSessionButton component
 *
 * This button is used to complete an workout session.
 * When the user is finished, the session and exercises data will be saved
 * to their database.
 */
const FinishSessionButton = () => {
    // Destructure required context state
    const {
        sessionExercises,
        sessionStartTime,
        setExerciseModalState,
        removeWorkoutActive,
        removeSessionStartTime,
        removeSessionExercises,
        setSelectedExerciseInfo,
        setExerciseAdded,
    } = useContext(exerciseModalContext);

    const handleClick = async () => {
        // Check if any exercises were added
        const exercises = sessionExercises.getExercises();
        const isExercisesAdded = Object.keys(exercises).length != 0;

        // If they have, update the state
        if (isExercisesAdded) {
            const startTimeObject = new Date(sessionStartTime);
            const sessionUid = startTimeObject.getTime().toString();
            const userUid = auth.currentUser.uid;
            const userSessionObject = {
                startTime: startTimeObject,
                exercises: sessionExercises.getExercises(),
            };

            // Convert the custom objects into basic objects for storage
            const basicObject = JSON.parse(JSON.stringify(userSessionObject));

            // Upload data to firestore
            try {
                const userExerciseHistoryDocRef = doc(
                    db,
                    `users/${userUid}/exerciseHistory`,
                    sessionUid
                );

                await setDoc(userExerciseHistoryDocRef, basicObject);
            } catch (err) {
                console.error(err);
            }
        }

        // Update state to end session and prepare for next session
        removeWorkoutActive();
        removeSessionStartTime();
        removeSessionExercises();
        setExerciseModalState("default");
        setSelectedExerciseInfo(null);
        setExerciseAdded(null);
    };

    return (
        <GreyButton handleClick={handleClick}>
            <span>Finish Session</span>
        </GreyButton>
    );
};

export default FinishSessionButton;
