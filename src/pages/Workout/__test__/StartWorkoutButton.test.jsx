import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StartWorkoutButton from "../components/StartWorkoutButton";

describe("startWorkoutButton tests", () => {
    it("renders without crashing", () => {
        render(<StartWorkoutButton />);

        expect(screen.getByText(/start new workout/i)).toBeInTheDocument();
    });

    it("calls the handleClick function when passed as a prop", async () => {
        const handleClickMock = vi.fn();
        const user = userEvent.setup();
        
        render(<StartWorkoutButton handleClick={handleClickMock}/>);

        const button = screen.getByRole("button")
        await user.click(button)

        expect(handleClickMock).toHaveBeenCalledOnce()
    })
});
