import { describe, it, expect } from "vitest";
import validateEmail from "../formUtils/validateEmail";

describe("validateEmail tests", () => {
    it("returns error message when email is empty", () => {
        expect(validateEmail("")).not.toBeNull();
    });

    it("returns an error message for invalid email addresses", () => {
        expect(validateEmail(" notvalid@domain.com")).not.toBeNull();
        expect(validateEmail("not a valid email")).not.toBeNull();
        expect(validateEmail("invalidATdomain.com.au")).not.toBeNull();
    });

    it("returns null for valid email addresses", () => {
        expect(validateEmail("example@domain.com")).toBeNull();
        expect(validateEmail("example@domain.com.au")).toBeNull();
        expect(validateEmail("JohnSmith@domain.biz")).toBeNull();
        expect(validateEmail("JohnSmith@domain.co.uk")).toBeNull();
    })
});
