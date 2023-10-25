import { Link } from "react-router-dom";

const Landing = () => {
    return (
        <>
            <h1>Landing</h1>
            <Link to="/signin">Sign in</Link>
            <Link to="/signup">Sign up</Link>
        </>
    );
};

export default Landing;
