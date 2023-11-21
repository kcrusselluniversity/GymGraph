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
 * @param {number} percentage: The percentage of completion (as represented as
 * a number between 0 and 1 inclusive)
 * @param {number} diameter: Diameter of circle progressbar in pixels
 */
const CircularProgressbar = ({
    children,
    percentage = 1.0,
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
            <svg
                data-testid="svg"
                className="circularProgressbar__circle"
                viewBox="0 0 100 100"
            >
                <circle
                    r="45"
                    strokeWidth="10px"
                    cx="50"
                    cy="50"
                    strokeDasharray={circularProgressbarCircum}
                    strokeDashoffset={(1 - percentage) * circularProgressbarCircum}
                />
            </svg>
        </div>
    );
};

CircularProgressbar.propTypes = {
    children: node,
    percentage: number,
    diameter: number,
};

export default CircularProgressbar;
