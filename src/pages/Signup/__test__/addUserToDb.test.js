import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { addDoc, collection } from "firebase/firestore";
import { testUserObject } from "../../../data/constants";
import { addUserToDb } from "../utils/addUserToDb";

vi.mock("../../../config/firebase", () => {
    return {
        db: {},
    };
});

vi.mock("firebase/firestore", () => {
    return {
        addDoc: vi.fn(),
        collection: vi.fn(),
    };
});

describe("addUserToDb tests", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("add a user to Firestore database", async () => {
        const user = testUserObject;

        collection.mockReturnValue({});
        addDoc.mockResolvedValue(true); // Mocking successful addition

        await addUserToDb(user);

        expect(addDoc).toBeCalledWith(expect.anything(), user);
    });

    it("handles an error gracefully", async () => {
        const consoleErrorSpy = vi
            .spyOn(console, "error")
            .mockImplementation(() => {});
        const user = testUserObject;

        collection.mockReturnValue({});
        addDoc.mockRejectedValue(new Error("An error has occured"));

        await addUserToDb(user);

        expect(consoleErrorSpy).toHaveBeenCalledWith(
            new Error("An error has occured")
        );
    });
});
