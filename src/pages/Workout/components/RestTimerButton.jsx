import { func } from "prop-types";
import { ReactSVG } from "react-svg";
import restTimerIcon from '../../../assets/icons/RestTimer__Icon.svg'
import GreyButton from "../../../components/ui/GreyButton";

const RestTimerButton = ({ handleClick }) => {
    return (
        <GreyButton
            handleClick={handleClick}
            className="RestTimerButton"
        >
            <ReactSVG src={restTimerIcon} />
            <span>Rest Timer</span>
        </GreyButton>
    );
};

RestTimerButton.propTypes = {
    handleClick: func,
};

export default RestTimerButton;
