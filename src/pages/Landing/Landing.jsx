import { Link } from "react-router-dom";

const Landing = () => {
    return (
        <div className="landing">
            <main>
                <h1>Landing</h1>
                <Link to="/signin">Sign in</Link>
                <Link to="/signup">Sign up</Link>
            </main>
        </div>
    );
};

export default Landing;
