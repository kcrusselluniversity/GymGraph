import { Dialog } from "@mui/material";
import RestTimerButton from "./RestTimerButton";
import RestTimer from "../../../components/ui/RestTimer";
import AddExerciseButton from "./AddExerciseButton";
import ExerciseItem from "./ExerciseItem";
import { useContext, useState } from "react";
import ExerciseModal from "./ExerciseModal";
import { exerciseModalContext } from "../../../context/exerciseModalContext";

/**
 * Exercise Session component
 *
 * This component renders when the user starts an exercise session.
 * It is responsible for providing the UI to add exercises and view the
 * data of the current workout session.
 */
const ExerciseSession = () => {
    const [isRestTimerOpen, setIsRestTimerOpen] = useState(false);
    const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);

    const { sessionExercises } = useContext(exerciseModalContext);

    const exerciseItems = Object.keys(sessionExercises).map((exerciseUid) => {
        return (
            <ExerciseItem
                key={exerciseUid}
                sets={sessionExercises[exerciseUid].sets}
                exerciseObject={sessionExercises[exerciseUid].exerciseObject}
            />
        );
    });

    return (
        <div className="exerciseSession">
            <AddExerciseButton
                handleClick={() => setIsExerciseModalOpen(true)}
            />
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

export default ExerciseSession;
