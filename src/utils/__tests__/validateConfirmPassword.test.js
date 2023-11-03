import { describe, it, expect } from "vitest";
import validateConfirmPassword from "../formUtils/validateConfirmPassword";

describe("validateConfirmPassword tests", () => {
    it("returns an error message if the two passwords don't match", () => {
        expect(
            validateConfirmPassword("Password1!", "Password2!")
        ).not.toBeNull();
    });

    it("returns null if the confirm password is valid", () => {
        expect(validateConfirmPassword("Password1!", "Password1!")).toBeNull();
    });
});
