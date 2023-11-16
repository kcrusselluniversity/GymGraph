import { node } from "prop-types";
import "./CircularProgressbar.css";

const CircularProgressbar = ({ children }) => {
    return (
        <div className="circularProgressbar__outerCircle">
            <div className="circularProgressbar__innerCircle">{children}</div>
            <svg className="circularProgressbar__circle" viewBox="0 0 100 100">
                <circle r="45" strokeWidth="10px" cx="50" cy="50" />
            </svg>
        </div>
    );
};

CircularProgressbar.propTypes = {
    children: node.isRequired,
};

export default CircularProgressbar;
