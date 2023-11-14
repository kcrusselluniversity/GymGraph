import { describe, it, expect, vi, afterEach } from "vitest";
import { signInWithPopup } from "firebase/auth";
import handleSignInWithGoogle from "../utils/handleSignInWithGoogle";
import { addGoogleUserToDb } from "../../../utils/firebaseUtils/addGoogleUserToDb";
import FirebaseAuthCustomError from "../../../utils/firebaseUtils/FirebaseAuthCustomError";

vi.mock("../../../utils/firebaseUtils/addGoogleUserToDb");
vi.mock("firebase/auth", () => {
    return {
        signInWithPopup: vi.fn(),
        getAuth: vi.fn(() => {
            return {};
        }),
        GoogleAuthProvider: vi.fn(() => {
            return {};
        }),
    };
});

afterEach(vi.restoreAllMocks);

describe("handleSignInWithGoogle function tests", () => {
    it("signs in a valid user", async () => {
        signInWithPopup.mockResolvedValue({
            user: { email: "validuser@test.com" },
        });

        await handleSignInWithGoogle();

        expect(addGoogleUserToDb).toBeCalledTimes(1);
    });

    it("handles an error gracefully", async () => {
        signInWithPopup.mockRejectedValue(
            new FirebaseAuthCustomError(
                "Firebase auth test error",
                "auth/invalid-login"
            )
        );
        
        const errorMessageSpy = vi
            .spyOn(console, "error")
            .mockImplementation(() => {});

        await handleSignInWithGoogle();

        expect(addGoogleUserToDb).not.toBeCalled();
        expect(errorMessageSpy).toHaveBeenCalledWith("auth/invalid-login");
    });
});
