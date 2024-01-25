import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../config/firebase";
import { DEMO_USER_EMAIL, DEMO_USER_PASSWORD } from "../../../data/constants";

const handleSignInDemoAccount = async (navigate, setIsLoading) => {
    const email = DEMO_USER_EMAIL;
    const password = DEMO_USER_PASSWORD;

    setIsLoading(true);

    try {
        // Sign user in
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
    }

    // Route valid user to dashbaord
    navigate("/user/dashboard");

    setIsLoading(false);
};

export default handleSignInDemoAccount;
