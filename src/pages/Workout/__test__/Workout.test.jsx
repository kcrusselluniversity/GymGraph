import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Workout from "../Workout";
import userEvent from "@testing-library/user-event";

describe("Workout page tests", () => {
    it("renders without crashing", () => {
        render(<Workout />);

        const startWorkoutButton = screen.getByRole("button", {
            name: /start/i,
        });
        expect(startWorkoutButton).toBeInTheDocument();
    });

    it("renders the start button on initial load", () => {
        render(<Workout />);

        const startWorkoutButton = screen.getByRole("button", {
            name: /start/i,
        });
        expect(startWorkoutButton).toBeInTheDocument();
    });

    it("does not show a start button when the workout has already started", async () => {
        const user = userEvent.setup()
        
        render(<Workout />);

        const startWorkoutButton = screen.getByRole("button", {
            name: /start/i,
        });

        await user.click(startWorkoutButton);

        expect(startWorkoutButton).not.toBeInTheDocument();
    });
});
