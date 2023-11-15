import LightTooltip from "./LightTooltip";
import { ReactSVG } from "react-svg";
import { string } from "prop-types";

const IconWithTooltip = ({ icon, title }) => {
    return (
        <LightTooltip title={title} data-testid="tooltip">
            <span>
                <ReactSVG src={icon} className="links__icon"/>
            </span>
        </LightTooltip>
    );
};

IconWithTooltip.propTypes = {
    icon: string,
    title: string,
};

export default IconWithTooltip;
