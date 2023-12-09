import { describe, it, expect, vi, afterEach } from "vitest";
import { addDoc, collection } from "firebase/firestore";
import { TEST_USER_OBJECT } from "../../data/constants";
import { addEmailUserToDb } from "../firebaseUtils/addEmailUserToDb";

// Mock the modules that make API calls
vi.mock("../../../config/firebase", () => {
    return {
        db: {},
    };
});

vi.mock("firebase/firestore", async () => {
    return {
        getFirestore: vi.fn(),
        addDoc: vi.fn(),
        collection: vi.fn(),
    };
});

describe("addEmailUserToDb tests", () => {
    afterEach(vi.restoreAllMocks);

    it("adds a user to Firestore database", async () => {
        const user = TEST_USER_OBJECT;

        collection.mockReturnValue({});
        addDoc.mockResolvedValue(true); // Mocking successful addition

        await addEmailUserToDb(user);

        expect(addDoc).toBeCalledWith(expect.anything(), user);
    });

    it("handles an error gracefully", async () => {
        const consoleErrorSpy = vi
            .spyOn(console, "error")
            .mockImplementation(() => {});
        const user = TEST_USER_OBJECT;

        collection.mockReturnValue({});
        addDoc.mockRejectedValue(new Error("An error has occured"));

        await addEmailUserToDb(user);

        expect(consoleErrorSpy).toHaveBeenCalledWith(
            new Error("An error has occured")
        );
    });
});
