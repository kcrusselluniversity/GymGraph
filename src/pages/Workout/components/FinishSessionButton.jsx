import GreyButton from "../../../components/ui/GreyButton";

/**
 * FinishSessionButton component
 *
 * This button is used to complete an workout session.
 * When the user is finished, the session and exercises data will be saved
 * to their database.
 */
const FinishSessionButton = () => {
    const handleClick = () => {
        // Check if any exercises were added
        // If they have, update the state
            // Upload data to firestore
        // If not, update the relevant state accordingly
        
        // Update state to end session
    };

    return (
        <GreyButton handleClick={handleClick}>
            <span>Finish Session</span>
        </GreyButton>
    );
};

export default FinishSessionButton;
