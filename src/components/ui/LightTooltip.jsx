import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";

const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip
    classes={{ popper: className }}
    TransitionComponent={Fade}
    placement="right-start"
    {...props}
    />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "white",
        color: "rgba(0, 0, 0, 0.87)",
        boxShadow: theme.shadows[1],
        fontSize: "1rem",
        fontWeight: "400",
        padding: "4px 12px",
    },
}));

export default LightTooltip;
