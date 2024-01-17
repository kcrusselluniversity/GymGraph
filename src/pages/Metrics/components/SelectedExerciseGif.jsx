import { useContext } from "react";
import GifContainer from "../../../components/ui/GifContainer";
import { metricsContext } from "../../../context/appContext";
import { EXERCISE_GIF_URL_ENDPOINT } from "../../../data/constants";

/**
 * Selected exercise gif
 * 
 * SelectedExerciseGif is a React functional component that is responsible 
 * for displaying a GIF image of a selected exercise.
 */
const SelectedExerciseGif = () => {
    const { selectedExercise, isGifLoading, setIsGifLoading } =
        useContext(metricsContext);

    const { name, uid } = selectedExercise;
    const exerciseGifUrl = `${EXERCISE_GIF_URL_ENDPOINT}/${uid}.gif`;

    return (
        <div className="selectedExercise__gifWrapper Card">
            <GifContainer
                isGifLoading={isGifLoading}
                setIsGifLoading={setIsGifLoading}
                exerciseGifUrl={exerciseGifUrl}
                name={name}
            />
        </div>
    );
};

export default SelectedExerciseGif;
