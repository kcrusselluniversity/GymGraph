import { describe, it, expect } from "vitest";
import validatePassword from "../formUtils/validatePassword";

describe("validatePassword tests", () => {
    it("returns error message when password is empty", () => {
        expect(validatePassword("")).not.toBeNull();
    });

    it("returns error message when invalid password format", () => {
        expect(validatePassword("123")).not.toBeNull();
        expect(validatePassword("passwords")).not.toBeNull();
        expect(validatePassword("passwords23")).not.toBeNull();
        expect(validatePassword("pw")).not.toBeNull();
        expect(validatePassword("12345678")).not.toBeNull();
    });

    it("returns null when password is valid", () => {
        expect(validatePassword("Password1!")).toBeNull();
    });
});