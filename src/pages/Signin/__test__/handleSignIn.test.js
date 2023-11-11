import { describe, it, expect, vi, afterEach } from "vitest";
import handleSignIn from "../utils/handleSignIn";
import { signInWithEmailAndPassword } from "firebase/auth";

/**
 * Helper function to set up the handleSignup function call with default mock
 * values
 */
const setup = (
    formData = {},
    setFormSubmissionError = vi.fn(),
    setIsLoading = vi.fn(),
    navigate = vi.fn()
) => {
    const e = { preventDefault: vi.fn(() => {}) };
    return {
        e,
        formData,
        setFormSubmissionError,
        setIsLoading,
        navigate,
    };
};

vi.mock("firebase/auth", () => {
    return {
        signInWithEmailAndPassword: vi.fn(),
    };
});

vi.mock("../../../config/firebase", () => {
    return { auth: {} };
});

afterEach(vi.restoreAllMocks);

describe("handleSignIn function tests", () => {
    it("returns early if form has errors", async () => {
        const { e, setFormSubmissionError, setIsLoading, navigate } = setup();
        const formData = { email: "", password: "password" };

        await handleSignIn(
            e,
            formData,
            setFormSubmissionError,
            setIsLoading,
            navigate
        );

        expect(setFormSubmissionError).toBeCalledTimes(1);
        expect(setFormSubmissionError).toBeCalledWith(
            "Please enter both your email and password to log in"
        );
    });

    it("should set an error message if the user is not found in firebase auth backend", async () => {
        const { e, setFormSubmissionError, setIsLoading, navigate } = setup();

        const formData = { user: "testUser", password: "password" };

        signInWithEmailAndPassword.mockImplementation(() => {
            throw new Error("invalid creditials");
        });

        await handleSignIn(
            e,
            formData,
            setFormSubmissionError,
            setIsLoading,
            navigate
        );

        expect(setFormSubmissionError).toBeCalledTimes(1);
    });

    it("should route the user to the dashboard page if valid signin", async () => {
        const { e, setFormSubmissionError, setIsLoading, navigate } = setup();
        const formData = { user: "testUser", password: "password" };

        await handleSignIn(
            e,
            formData,
            setFormSubmissionError,
            setIsLoading,
            navigate
        );

        expect(navigate).toBeCalledTimes(1);
        expect(navigate).toBeCalledWith("/user/dashboard")
        expect(setIsLoading).toBeCalledWith(false);
    });
});
