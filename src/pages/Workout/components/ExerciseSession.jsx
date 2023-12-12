import { Dialog } from "@mui/material";
import RestTimerButton from "./RestTimerButton";
import RestTimer from "../../../components/ui/RestTimer";
import AddExerciseButton from "./AddExerciseButton";
import ExerciseItem from "./ExerciseItem";
import { PropTypes, func, number, string } from "prop-types";
import { useState } from "react";
import ExerciseModal from "./ExerciseModal";

/**
 * Exercise Session component
 *
 * This component renders when the user starts an exercise session.
 * It is responsible for providing the UI to add exercises and view the
 * data of the current workout session.
 *
 * @param {object} sessionExercises: Object containing the data on the current workout
 * sessions exercises
 * @param {function} setSessionExercises: State setter function to update the
 * exercises object state
 * @returns {any}
 */
const ExerciseSession = ({ sessionExercises, setSessionExercises }) => {
    const [isRestTimerOpen, setIsRestTimerOpen] = useState(false);
    const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);

    const exerciseItems = sessionExercises?.map((exercise) => {
        return <ExerciseItem key={exercise.name} exercise={exercise} />;
    });

    return (
        <div className="exerciseSession">
            <AddExerciseButton handleClick={() => setIsExerciseModalOpen(true)}/>
            {exerciseItems}
            <RestTimerButton
                handleClick={() => setIsRestTimerOpen(!isRestTimerOpen)}
            />
            <Dialog
                open={isRestTimerOpen}
                onClose={() => setIsRestTimerOpen(false)}
            >
                <RestTimer />
            </Dialog>
            <Dialog
                open={isExerciseModalOpen}
                fullWidth
                maxWidth="sm"
                onClose={() => setIsExerciseModalOpen(false)}
            >
                <ExerciseModal />
            </Dialog>
        </div>
    );
};

ExerciseSession.propTypes = {
    sessionExercises: PropTypes.arrayOf(
        PropTypes.shape({
            name: string,
            sets: PropTypes.arrayOf(
                PropTypes.shape({
                    weight: number,
                    reps: number,
                })
            ),
        })
    ),
    setSessionExercises: func,
};

export default ExerciseSession;
