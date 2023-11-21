import { describe, it, expect } from "vitest";
import secondsToMinutesAndSeconds from "../secondsToMinutesAndSeconds";

describe("seconds formatter function tests", () => {
    it("formats a duration of 10 seconds correctly", () => {
        expect(secondsToMinutesAndSeconds(10)).toEqual("0:10");
    });

    it("formats a single digit in the seconds place with a leading zero", () => {
        const duration = 61; // 1 minute and 1 second
        expect(secondsToMinutesAndSeconds(duration)).toEqual("1:01");
    });

    it("formats a duration of zero correctly", () => {
        const duration = 0;
        expect(secondsToMinutesAndSeconds(duration)).toEqual("0:00");
    });

    it("returns undefined if passed a duration less than 0", () => {
        const duration = -10;
        expect(secondsToMinutesAndSeconds(duration)).toBeUndefined();
    });
    
    it("returns undefined if passed a non numeric type", () => {
        const duration = "10";
        expect(secondsToMinutesAndSeconds(duration)).toBeUndefined();
    });

    it("handles a large duration", () => {
        const duration = 10000;
        expect(secondsToMinutesAndSeconds(duration)).toEqual("166:40");    
    })
});
