import { describe, it, expect, vi, afterEach } from "vitest";
import { signInWithRedirect } from "firebase/auth";
import handleSignInWithGoogle from "../firebaseUtils/handleSignInWithGoogle";
import { addUserToDb } from "../firebaseUtils/addUserToDb"
import FirebaseAuthCustomError from "../firebaseUtils/FirebaseAuthCustomError";

vi.mock("../firebaseUtils/addUserToDb");
vi.mock("firebase/auth", () => {
    return {
        signInWithRedirect: vi.fn(),
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
        signInWithRedirect.mockResolvedValue({
            user: { email: "validuser@test.com" },
        });

        await handleSignInWithGoogle();

        expect(addUserToDb).toBeCalledTimes(1);
    });

    it("handles an error gracefully", async () => {
        signInWithRedirect.mockRejectedValue(
            new FirebaseAuthCustomError(
                "Firebase auth test error",
                "auth/invalid-login"
            )
        );
        
        const errorMessageSpy = vi
            .spyOn(console, "error")
            .mockImplementation(() => {});

        await handleSignInWithGoogle();

        expect(addUserToDb).not.toBeCalled();
        expect(errorMessageSpy).toHaveBeenCalledWith("auth/invalid-login");
    });
});
