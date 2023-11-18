import { node, number } from "prop-types";
import "./CircularProgressbar.css";
import {
    circularProgressbarCircum,
    innerToOuterCircleRatio,
} from "../../data/constants";

/**
 * Component to represent the percentage of progress of a desired
 * quantity in a circular format
 * @param {object} children: The children prop
 * @param {number} percentage: The percentage of completion
 * @param {number} diameter: Diameter of circle progressbar in pixels
 */
const CircularProgressbar = ({
    children,
    percentage = 100,
    diameter = 200,
}) => {
    return (
        <div
            className="circularProgressbar__outerCircle"
            style={{
                width: `${diameter}px`,
                height: `${diameter}px`,
            }}
        >
            <div
                className="circularProgressbar__innerCircle"
                style={{
                    width: `${innerToOuterCircleRatio * diameter}px`,
                    height: `${innerToOuterCircleRatio * diameter}px`,
                }}
            >
                {children}
            </div>
            <svg className="circularProgressbar__circle" viewBox="0 0 100 100">
                <circle
                    r="45"
                    strokeWidth="10px"
                    cx="50"
                    cy="50"
                    strokeDasharray={circularProgressbarCircum}
                    strokeDashoffset={
                        ((100 - percentage) / 100) * circularProgressbarCircum
                    }
                />
            </svg>
        </div>
    );
};

CircularProgressbar.propTypes = {
    children: node.isRequired,
    percentage: number,
    diameter: number, 
};

export default CircularProgressbar;
