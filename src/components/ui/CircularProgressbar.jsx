import { node, number } from "prop-types";
import "./CircularProgressbar.css";
import { circularProgressbarCircum } from "../../data/constants";

/**
 * Component to represent the percentage of progress of a desired
 * quantity in a circular format
 * @param {object} children: The children prop
 * @param {number} percentage: The percentage of completion
 */
const CircularProgressbar = ({ children, percentage=0 }) => {
    return (
        <div className="circularProgressbar__outerCircle">
            <div className="circularProgressbar__innerCircle">{children}</div>
            <svg className="circularProgressbar__circle" viewBox="0 0 100 100">
                <circle
                    r="45"
                    strokeWidth="10px"
                    cx="50"
                    cy="50"
                    strokeDasharray={circularProgressbarCircum}
                    strokeDashoffset={
                        (100 - percentage)/100 * circularProgressbarCircum
                    }
                />
            </svg>
        </div>
    );
};

CircularProgressbar.propTypes = {
    children: node.isRequired,
    percentage: number,
};

export default CircularProgressbar;
