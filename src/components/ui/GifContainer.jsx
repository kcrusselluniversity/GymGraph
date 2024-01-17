import { Skeleton } from "@mui/material";
import { GIF_SIZE_STANDARD } from "../../data/constants";
import { bool, func, string } from "prop-types";

/**
 * Gif Container
 *
 * This is a helper component for the ExerciseDetails componant.
 * It renders the exercise gif associated with the selected exercise,
 * and shows a skeleton loading image if the gif is still loading.
 */
const GifContainer = ({
    name,
    exerciseGifUrl,
    isGifLoading,
    setIsGifLoading,
}) => {
    return (
        <div
            className="gifContainer"
            style={{
                height: `${GIF_SIZE_STANDARD}px`,
                width: `${GIF_SIZE_STANDARD}px`,
            }}
        >
            <img
                alt={name}
                src={exerciseGifUrl}
                onLoad={() => setIsGifLoading(false)}
            />
            {isGifLoading && (
                <Skeleton
                    className="exerciseDetails__skeleton"
                    variant="rectangular"
                    data-testid="exerciseDetailsSkeleton"
                    height={GIF_SIZE_STANDARD}
                    width={GIF_SIZE_STANDARD}
                    sx={{
                        borderRadius: "1rem",
                        opacity: isGifLoading ? 1 : 0,
                    }}
                />
            )}
        </div>
    );
};

GifContainer.propTypes = {
    name: string,
    exerciseGifUrl: string,
    isGifLoading: bool,
    setIsGifLoading: func,
};

export default GifContainer;
