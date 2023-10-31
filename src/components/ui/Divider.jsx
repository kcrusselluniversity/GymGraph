import { string } from 'prop-types';

/**
 * Divider Component
 * 
 * Generates a generic UI component that creates text with straight lines
 * either side.
 * 
 * Props: 
 * @param {string} direction: Sets the flex direction of the component as 
 * column or row. 
 * @param {string} text: The text you want to be centered in the UI component.
 */
const Divider = ({ direction, text }) => {
    return (
        <div className={`divider-${direction}`}>
            <div className={`divider__line-${direction}`}></div>
            <span className={`divider__text-${direction}`}>{text}</span>
            <div className={`divider__line-${direction}`}></div>
        </div>
    );
};

Divider.propTypes = {
    direction: string.isRequired,
    text: string.isRequired,
}

export default Divider;
