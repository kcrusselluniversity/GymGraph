import { useContext } from "react";
import GreyButton from "../../../components/ui/GreyButton";
import { exerciseModalContext } from "../../../context/exerciseModalContext";

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
        setExerciseModalState,
        removeWorkoutActive,
        removeSessionStartTime,
        removeSessionExercises,
        setSelectedExerciseInfo,
        setExerciseAdded,
    } = useContext(exerciseModalContext);

    const handleClick = () => {
        // Check if any exercises were added
        // If they have, update the state
        // Upload data to firestore
        // If not, update the relevant state accordingly
        
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
