import { describe, it, expect } from "vitest";
import validateName from "../formUtils/validateName";
import { maxLengthName } from "../formUtils/validateName";

describe("validateFirstName tests", () => {
    it("returns error message when name is empty", () => {
        expect(validateName("")).not.toBeNull();
    });

    it("returns error message when name has spaces", () => {
        expect(validateName("Jon ny")).not.toBeNull();
        expect(validateName("Jonny ")).not.toBeNull();
    });

    it("returns an error message when name is non alphabetic", () => {
        expect(validateName("1sampson")).not.toBeNull();
        expect(validateName("*sampson*")).not.toBeNull();
    });

    it(`returns an error message if the name is too long (more than ${maxLengthName} characters)`, () => {
        expect(
            validateName("AlexandrinaCatherinaElizabethAnastasiaJosephinaMaria")
        ).not.toBeNull();
    });

    it("returns null if the name is valid", () => {
        expect(validateName("SamPsoN")).toBeNull();
        expect(validateName("Jonny")).toBeNull();
    });
});
