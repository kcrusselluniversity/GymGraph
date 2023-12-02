import { Dialog } from "@mui/material";
import RestTimerButton from "./RestTimerButton";
import RestTimer from "../../../components/ui/RestTimer";
import AddExerciseButton from "./AddExerciseButton";
import ExerciseItem from "./ExerciseItem";
import { PropTypes, func, number, string } from "prop-types";
import { useState } from "react";

/**
 * Exercise Session component
 *
 * This component renders when the user starts an exercise session.
 * It is responsible for providing the UI to add exercises and view the
 * data of the current workout session.
 *
 * @param {object} exercises: Object containing the data on the current workout
 * sessions exercises
 * @param {function} setExercises: State setter function to update the
 * exercises object state
 * @returns {any}
 */
const ExerciseSession = ({ exercises, setExercises }) => {
    const [isRestTimerOpen, setIsRestTimerOpen] = useState(false);

    const exerciseItems = exercises?.map((exercise) => {
        return <ExerciseItem key={exercise.name} exercise={exercise} />;
    });

    return (
        <div className="exerciseSession">
            <AddExerciseButton />
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
        </div>
    );
};

ExerciseSession.propTypes = {
    exercises: PropTypes.arrayOf(
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
    setExercises: func,
};

export default ExerciseSession;
