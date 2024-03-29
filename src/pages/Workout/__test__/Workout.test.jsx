import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Workout from "../Workout";
import userEvent from "@testing-library/user-event";
import ExerciseModalProvider from "../../../context/ExerciseModalProvider";

// Mock the reactSVG component as it appears to make network requests
// under the hood which is not desired in our unit tests
vi.mock("react-svg", () => {
    return {
        ReactSVG: vi.fn(() => <div>icon</div>),
    };
});

// Mock the finish session button to simplify testing of workout page
// Testing of finish session button should be done separately
vi.mock("../components/FinishSessionButton", () => {
    return {
        default: () => <div>Finish Session Btn</div>,
    };
});

// Mock scroll to top component
vi.mock("../../../components/ui/ScrollToTopOnLoad", () => {
    return {
        default: () => <div></div>,
    };
});

describe("Workout page tests", () => {
    it("renders without crashing", () => {
        render(<Workout />, { wrapper: ExerciseModalProvider });

        const startWorkoutButton = screen.getByRole("button", {
            name: /start/i,
        });
        expect(startWorkoutButton).toBeInTheDocument();
    });

    it("renders the start button on initial load", () => {
        render(<Workout />, { wrapper: ExerciseModalProvider });

        const startWorkoutButton = screen.getByRole("button", {
            name: /start/i,
        });
        expect(startWorkoutButton).toBeInTheDocument();
    });

    it("does not show a start button when the workout has already started", async () => {
        const user = userEvent.setup();

        render(<Workout />, { wrapper: ExerciseModalProvider });

        const startWorkoutButton = screen.getByRole("button", {
            name: /start/i,
        });

        await user.click(startWorkoutButton);

        expect(startWorkoutButton).not.toBeInTheDocument();
    });
});
