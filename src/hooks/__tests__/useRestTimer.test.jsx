import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useRestTimer from "../useRestTimer";
import { initialRestTime, timeAdjustmentInSeconds } from "../../data/constants";

describe("useRestTimer hook tests", () => {
    it("should initialise with the correct default values", () => {
        const { result } = renderHook(useRestTimer);

        expect(result.current.chosenTime).toEqual(initialRestTime);
        expect(result.current.remainingTime).toEqual(initialRestTime);
        expect(result.current.isActive).toEqual(false);
        expect(result.current.isFinished).toEqual(false);
    });

    it("should handle the timer being incremented", () => {
        const { result } = renderHook(useRestTimer);
        const initialChosenTime = result.current.chosenTime;
        const initialRemainingTime = result.current.remainingTime;

        act(() => {
            result.current.handleTimeAdded();
        });

        expect(result.current.chosenTime).toEqual(
            initialChosenTime + timeAdjustmentInSeconds
        );

        expect(result.current.remainingTime).toEqual(
            initialRemainingTime + timeAdjustmentInSeconds
        );
    });

    it("should handle the timer being decremented", () => {
        const { result } = renderHook(useRestTimer);
        const initialChosenTime = result.current.chosenTime;
        const initialRemainingTime = result.current.remainingTime;

        act(() => {
            result.current.handleTimeSubtracted();
        });

        expect(result.current.chosenTime).toEqual(
            initialChosenTime - timeAdjustmentInSeconds
        );

        expect(result.current.remainingTime).toEqual(
            initialRemainingTime - timeAdjustmentInSeconds
        );
    });
});
