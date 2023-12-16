import { Dialog } from "@mui/material";
import RestTimerButton from "./RestTimerButton";
import RestTimer from "../../../components/ui/RestTimer";
import AddExerciseButton from "./AddExerciseButton";
import ExerciseItem from "./ExerciseItem";
import { useContext, useState } from "react";
import ExerciseModal from "./ExerciseModal";
import { exerciseModalContext } from "../../../context/exerciseModalContext";
import sortExerciseByStartTime from "../utils/sortExerciseByStartTime";

/**
 * Exercise Session component
 *
 * This component renders when the user starts an exercise session.
 * It is responsible for providing the UI to add exercises and view the
 * data of the current workout session.
 */
const ExerciseSession = () => {
    const [isRestTimerOpen, setIsRestTimerOpen] = useState(false);
    const {
        sessionExercises,
        setExerciseAdded,
        isExerciseModalOpen,
        setIsExerciseModalOpen,
        setExerciseModalState,
        setSelectedExerciseInfo,
        setSearchInput,
    } = useContext(exerciseModalContext);

    // Sort session exercises chronologically
    const sortedSessionExercises = Object.values(sessionExercises).sort(
        sortExerciseByStartTime
    );

    // Map the session exercises to JSX ExerciseItem components
    const exerciseItems = sortedSessionExercises.map((exerciseItem) => {
        return (
            <ExerciseItem
                key={exerciseItem.exerciseObject.uid}
                sets={exerciseItem.sets}
                exerciseObject={exerciseItem.exerciseObject}
            />
        );
    });

    const handleAddExerciseBtnClick = () => {
        setExerciseModalState("default");
        setSelectedExerciseInfo(null), setExerciseAdded(null);
        setIsExerciseModalOpen(true);
        setSearchInput("");
    };

    return (
        <div className="exerciseSession">
            <AddExerciseButton handleClick={handleAddExerciseBtnClick} />
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
