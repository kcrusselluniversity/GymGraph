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
                thickness={3}
                size={75}
                variant="indeterminate"
            />
        </div>
    );
};

export default Loading;
