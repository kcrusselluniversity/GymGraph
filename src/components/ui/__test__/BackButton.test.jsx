import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import BackButton from "../BackButton";
import userEvent from "@testing-library/user-event";

// Mock the reactSVG component as it makes network requests
// under the hood which is not desired in our unit tests
vi.mock("react-svg", () => {
    return {
        ReactSVG: vi.fn(() => <div data-testid="backIcon">icon</div>),
    };
});

afterEach(vi.restoreAllMocks);

describe("Back button component tests", () => {
    it("renders without crashing", () => {
        render(<BackButton />);
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("renders the back button icon", () => {
        render(<BackButton />);
        expect(screen.getByTestId("backIcon")).toBeInTheDocument();
    });

    it("calls the handleBackArrowClick function when clicked", async () => {
        const mockBackArrowFunc = vi.fn();
        const user = userEvent.setup();

        render(<BackButton handleBackArrowClick={mockBackArrowFunc} />);
        const backButton = screen.getByRole("button");
        await user.click(backButton);

        expect(mockBackArrowFunc).toHaveBeenCalledTimes(1);
    });
});
