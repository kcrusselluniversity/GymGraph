import { describe, it, expect, vi, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useCountdown from "../useCountdown";

// Mocked functions
const setIsActive = vi.fn();
const setRemainingTime = vi.fn();
const setIsFinished = vi.fn();

afterEach(vi.restoreAllMocks);

describe("useCountdown hook tests", () => {
    it("decrements remaining time when active", () => {
        vi.useFakeTimers();
        let remainingTime = 180;

        renderHook(
            () => useCountdown(
                true,
                setIsActive,
                remainingTime,
                setRemainingTime,
                false,
                setIsFinished
            )
        );

        act(() => {
            vi.advanceTimersByTime(1000);
        })

        expect(setRemainingTime).toBeCalledTimes(1);
        expect(setIsActive).not.toHaveBeenCalled();
        expect(setIsFinished).not.toHaveBeenCalled();
    });
    
    it("does not decrement remaining time when no time remaining", () => {
        vi.useFakeTimers();
        let remainingTime = 0;

        renderHook(
            () => useCountdown(
                true,
                setIsActive,
                remainingTime,
                setRemainingTime,
                false,
                setIsFinished
            )
        );

        expect(setRemainingTime).not.toBeCalled();
        expect(setIsActive).toHaveBeenCalledWith(false);
        expect(setIsFinished).toHaveBeenCalledWith(true);
    });

    it("does not alter remaining time when not active", () => {
        vi.useFakeTimers();
        let remainingTime = 180;

        renderHook(
            () => useCountdown(
                false,
                setIsActive,
                remainingTime,
                setRemainingTime,
                false,
                setIsFinished
            )
        );

        expect(setRemainingTime).not.toBeCalled();
        expect(setIsActive).not.toHaveBeenCalled();
        expect(setIsFinished).not.toHaveBeenCalled();
    });

    it("does not alter remaining time when it is finished", () => {
        vi.useFakeTimers();
        let remainingTime = 180;

        renderHook(
            () => useCountdown(
                true,
                setIsActive,
                remainingTime,
                setRemainingTime,
                true,
                setIsFinished
            )
        );

        expect(setRemainingTime).not.toBeCalled();
        expect(setIsActive).not.toHaveBeenCalled();
        expect(setIsFinished).not.toHaveBeenCalled();
    });

    it("does not alter remaining time when remainingTime is invalid", () => {
        vi.useFakeTimers();
        let remainingTime = -10;

        renderHook(
            () => useCountdown(
                true,
                setIsActive,
                remainingTime,
                setRemainingTime,
                true,
                setIsFinished
            )
        );

        expect(setRemainingTime).not.toBeCalled();
        expect(setIsActive).not.toHaveBeenCalled();
        expect(setIsFinished).not.toHaveBeenCalled();
    });
});
