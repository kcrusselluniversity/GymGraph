import { bool, func, string } from "prop-types";
import { Skeleton } from "@mui/material";
import { GIF_SIZE_STANDARD } from "../../data/constants";

/**
 * Gif Container component
 *
 * This React component renders the exercise gif associated with the selected
 * exercise, and shows a skeleton loading image if the gif is still loading.
 */
const GifContainer = ({
    name,
    exerciseGifUrl,
    isGifLoading,
    setIsGifLoading,
}) => {
    return (
        <div className="gifContainer">
            <img
                alt={name}
                src={exerciseGifUrl}
                onLoad={() => setIsGifLoading(false)}
                width={`${GIF_SIZE_STANDARD}px`}
            />
            {isGifLoading && (
                <Skeleton
                    className="exerciseDetails__skeleton"
                    variant="rectangular"
                    data-testid="exerciseDetailsSkeleton"
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
