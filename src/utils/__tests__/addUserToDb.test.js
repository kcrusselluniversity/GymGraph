import { describe, it, expect, vi, afterEach } from "vitest";
import { setDoc } from "firebase/firestore";
import { TEST_USER_UID, TEST_USER_OBJECT } from "../../data/constants";
import { addUserToDb } from "../firebaseUtils/addUserToDb";

// Mock the modules that make API calls
vi.mock("../../../config/firebase", () => {
    return {
        db: {},
    };
});

vi.mock("firebase/firestore", async () => {
    return {
        getFirestore: vi.fn(),
        setDoc: vi.fn(),
        doc: vi.fn().mockReturnValue(true),
    };
});

describe("addUserToDb tests", () => {
    afterEach(vi.restoreAllMocks);

    it("adds a user to Firestore database", async () => {
        setDoc.mockResolvedValue(true); // Mocking successful addition

        await addUserToDb(TEST_USER_UID, TEST_USER_OBJECT);

        expect(setDoc).toBeCalledWith(expect.anything(), TEST_USER_OBJECT);
    });

    it("handles an error gracefully", async () => {
        const consoleErrorSpy = vi
            .spyOn(console, "error")
            .mockImplementation(() => {});

        setDoc.mockRejectedValue(new Error("An error has occured"));

        await addUserToDb(TEST_USER_OBJECT);

        expect(consoleErrorSpy).toHaveBeenCalledWith(
            new Error("An error has occured")
        );
    });
});
