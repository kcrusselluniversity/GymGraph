import { string } from 'prop-types';

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
