import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useRestTimer from "../useRestTimer";
import { INITIAL_REST_TIME, TIME_ADJUSTMENT_IN_SECONDS } from "../../data/constants";

describe("useRestTimer hook tests", () => {
    it("should initialise with the correct default values", () => {
        const { result } = renderHook(useRestTimer);

        expect(result.current.chosenTime).toEqual(INITIAL_REST_TIME);
        expect(result.current.remainingTime).toEqual(INITIAL_REST_TIME);
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
            initialChosenTime + TIME_ADJUSTMENT_IN_SECONDS
        );

        expect(result.current.remainingTime).toEqual(
            initialRemainingTime + TIME_ADJUSTMENT_IN_SECONDS
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
            initialChosenTime - TIME_ADJUSTMENT_IN_SECONDS
        );

        expect(result.current.remainingTime).toEqual(
            initialRemainingTime - TIME_ADJUSTMENT_IN_SECONDS
        );
    });
});
