import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import "./LogoutButton.css"

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }

        navigate("/");
    };

    return (
        <button className="logoutButton" onClick={handleClick}>
            Log Out
        </button>
    );
};

export default LogoutButton;
