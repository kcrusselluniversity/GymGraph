import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { handleSignup } from "../utils/handleSignup";
import { testUserObject } from "../../../data/constants";
import { createUserWithEmailAndPassword } from "firebase/auth";
import dayjs from "dayjs";

/**
 * Helper function to set up the handleSignup function call with default mock
 * values
 */
const setup = (
    formData = {},
    formErrors = {},
    navigate = vi.fn(),
    setIsLoading = vi.fn(),
    setFormSubmissionError = vi.fn()
) => {
    const e = { preventDefault: vi.fn(() => {}) };
    return {
        e,
        formErrors,
        formData,
        setIsLoading,
        setFormSubmissionError,
        navigate,
    };
};

// Mock dependencies
vi.mock("firebase/auth", () => {
    return {
        createUserWithEmailAndPassword: vi.fn(),
    };
});

vi.mock("../../../config/firebase", () => {
    return { auth: {} };
});

vi.mock("../utils/addUserToDb", () => {
    return { addUserToDb: vi.fn() };
});

beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(vi.restoreAllMocks);

describe("handleSignup function tests", () => {
    it("should return early if form has errors", async () => {
        const { e, formData, navigate, setIsLoading, setFormSubmissionError } =
            setup();
        const formErrors = { firstName: "name required" };

        await handleSignup(
            e,
            formErrors,
            formData,
            setIsLoading,
            setFormSubmissionError,
            navigate
        );

        expect(setIsLoading).not.toHaveBeenCalled();
    });

    it("should set an error message if the email is already in use", async () => {
        const {
            e,
            formErrors,
            setIsLoading,
            setFormSubmissionError,
            navigate,
        } = setup();

        // We add a dayjs date so that our user in a valid form
        const formData = {
            ...testUserObject,
            dob: dayjs(new Date(2000, 1, 1)),
        };

        createUserWithEmailAndPassword.mockRejectedValue({
            code: "auth/email-already-in-use",
        });

        await handleSignup(
            e,
            formErrors,
            formData,
            setIsLoading,
            setFormSubmissionError,
            navigate
        );

        expect(setFormSubmissionError).toBeCalledWith(
            "This email is already associated with an account, please sign in with your email and password"
        );
    });

    it("should call navigate with the user route if the user has been successfully created and added to the database", async () => {
        const {
            e,
            formErrors,
            navigate,
            setIsLoading,
            setFormSubmissionError,
        } = setup();

        const formData = {
            ...testUserObject,
            dob: dayjs(new Date(2000, 1, 1)),
        };

        await handleSignup(
            e,
            formErrors,
            formData,
            setIsLoading,
            setFormSubmissionError,
            navigate
        );

        expect(navigate).toBeCalledWith("/user/");
    });
    
    it("should set the loading state to true if the user has been successfully created and added to the database", async () => {
        const {
            e,
            formErrors,
            navigate,
            setIsLoading,
            setFormSubmissionError,
        } = setup();

        const formData = {
            ...testUserObject,
            dob: dayjs(new Date(2000, 1, 1)),
        };

        await handleSignup(
            e,
            formErrors,
            formData,
            setIsLoading,
            setFormSubmissionError,
            navigate
        );

        expect(setIsLoading).toBeCalledWith(true);
    });
});
