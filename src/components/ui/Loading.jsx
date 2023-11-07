import { CircularProgress } from "@mui/material";

/**
 * Loading UI component
 */
const Loading = () => {
    return (
        <div
            style={{
                display: "grid",
                placeContent: "center",
                height: "100dvh",
            }}
            className="loading_container"
        >
            <CircularProgress
                thickness={2}
                size={100}
                variant="indeterminate"
            />
        </div>
    );
};

export default Loading;
