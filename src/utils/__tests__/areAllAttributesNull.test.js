import { describe, it, expect } from "vitest";
import areAllAttributesNull from "../areAllAttributesNull";

describe("areAllAttributesNull function tests", () => {
    it("returns true if all attributes are null", () => {
        expect(areAllAttributesNull({a: null, b:null, c:null})).toBe(true);
        expect(areAllAttributesNull({a: null})).toBe(true);
        expect(areAllAttributesNull({})).toBe(true);
    })
    
    it("returns false if not all attributes are null", () => {
        expect(areAllAttributesNull({a: 1})).toBe(false);
        expect(areAllAttributesNull({a: 1, b:null})).toBe(false);
        expect(areAllAttributesNull({a: 1, b:2, c:3})).toBe(false);
    })
})