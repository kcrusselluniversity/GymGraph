import { describe, it, expect, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import RestTimer from "../ui/RestTimer";
import { INITIAL_REST_TIME } from "../../data/constants";
import secondsToMinutesAndSeconds from "../../utils/secondsToMinutesAndSeconds";
import RestTimerProvider from "../../context/RestTimerProvider";

beforeEach(vi.restoreAllMocks);
const testingInitialRestTime = 2;

// Mock constants module to reset the inital rest time to a small value
// for testing purposes
vi.mock("../../data/constants", async () => {
    const testingInitialRestTime = 2;
    const library = await vi.importActual("../../data/constants");
    return {
        ...library,
        INITIAL_REST_TIME: testingInitialRestTime,
    };
});

describe("RestTimer tests", () => {
    it("renders without crashing with no props given", () => {
         render(<RestTimer />, {wrapper: RestTimerProvider});
        expect(
            screen.getByRole("button", { name: /start/i })
        ).toBeInTheDocument();
    });

    it("renders without crashing with custom props", () => {
        render(<RestTimer diameter={100} />, {wrapper: RestTimerProvider});
        expect(
            screen.getByRole("button", { name: /start/i })
        ).toBeInTheDocument();
    });

    it("updates the timer correctly after 1 second has passed", async () => {
        const user = userEvent.setup({ delay: null });

         render(<RestTimer />, {wrapper: RestTimerProvider});

        const startBtn = screen.getByRole("button", { name: /start/i });

        await user.click(startBtn);

        // Simulate 1 second delay
        // NOTE: This may make the test fragile, if unexpected errors
        // occur investigate further.
        // UPDATE: This method in unsuitable for longer durations as you
        // have to wait the literal duration of the timeout, which for long
        // wait times is impractical to test your code
        // vitest useFakeTimers + advanceTimersByTime seem to not work as
        // intented for this use case, dig deeper into the few stackOverflow
        // posts on this issue
        await new Promise((res) => setTimeout(res, 1000));

        const remainingTimeElement = screen.getByTestId("remainingTime");
        const timeAfterOneSecond = INITIAL_REST_TIME - 1;
        expect(remainingTimeElement.textContent).toBe(
            secondsToMinutesAndSeconds(timeAfterOneSecond)
        );
    });

    it("updates the start button to a reset button when timer has run out", async () => {
        const user = userEvent.setup({ delay: null });

         render(<RestTimer />, {wrapper: RestTimerProvider});
        const startBtn = screen.getByRole("button", { name: /start/i });
        await user.click(startBtn);

        // Simulate 3 second delay
        await new Promise((res) => setTimeout(res, 3000));

        const remainingTimeElement = screen.getByTestId("remainingTime");
        const resetBtn = screen.getByRole("button", { name: /reset/i });
        expect(remainingTimeElement.textContent).toBe("0:00");
        expect(resetBtn).toBeInTheDocument();
    });

    it("does nothing if clicking the time adjustment btn would lead to a negative time if applied", async () => {
        const user = userEvent.setup({ delay: null });

         render(<RestTimer />, {wrapper: RestTimerProvider});

        const timeSubtractedBtn = screen.getByRole("button", { name: /-/i });

        await user.click(timeSubtractedBtn);

        const remainingTimeElement = screen.getByTestId("remainingTime");

        expect(remainingTimeElement.textContent).toBe(
            secondsToMinutesAndSeconds(INITIAL_REST_TIME)
        );
    });

    it("resets the clock to the initial rest time once the reset button has been pressed", async () => {
        const user = userEvent.setup({ delay: null });

         render(<RestTimer />, {wrapper: RestTimerProvider});
        const startBtn = screen.getByRole("button", { name: /start/i });
        await user.click(startBtn);

        // Simulate 3 second delay
        await new Promise((res) => setTimeout(res, 3000));

        const resetBtn = screen.getByRole("button", { name: /reset/i });

        await user.click(resetBtn);

        const remainingTimeElement = screen.getByTestId("remainingTime");
        expect(remainingTimeElement.textContent).toBe(
            secondsToMinutesAndSeconds(testingInitialRestTime)
        );
    });
});
