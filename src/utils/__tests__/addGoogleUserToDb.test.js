import { describe, it, expect, vi, afterEach } from "vitest";
import { addGoogleUserToDb } from "../firebaseUtils/addGoogleUserToDb";
import { addDoc, getDocs } from "firebase/firestore";

vi.mock("firebase/firestore", () => {
    return {
        addDoc: vi.fn(),
        getDocs: vi.fn(),
        getFirestore: vi.fn(),
        collection: vi.fn(() => {return {}}),
        query: vi.fn(),
        where: vi.fn(),
    };
});

afterEach(vi.restoreAllMocks);

describe("addGoogleUserToDb tests", () => {
    it("doesn't add Google user to db if they have already signed in before", async () => {
        const newUser = { email: "test@test.com" };
        getDocs.mockResolvedValue({ empty: false });
        await addGoogleUserToDb(newUser);
        expect(addDoc).not.toHaveBeenCalled();
    });

    it("adds Google user to db if its their first time signing in", async () => {
        const newUser = { email: "test@test.com" };
        getDocs.mockResolvedValue({ empty: true });
        await addGoogleUserToDb(newUser);

        expect(addDoc).toHaveBeenCalledWith(expect.anything(), newUser);
    });

    it("handles an error gracefully", async () => {
        const newUser = { email: "test@test.com" };
        
        const consoleErrorSpy = vi
            .spyOn(console, "error")
            .mockImplementation(() => {});

        getDocs.mockResolvedValue({ empty: true });
        addDoc.mockRejectedValue(new Error("An error has occured"));

        await addGoogleUserToDb(newUser);

        expect(consoleErrorSpy).toHaveBeenCalledWith(
            new Error("An error has occured")
        );
    });
});
