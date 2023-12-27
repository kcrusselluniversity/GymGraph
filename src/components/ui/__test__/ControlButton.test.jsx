import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import ControlButton from "../ControlButton";
import PlusIcon from "../../../assets/icons/Plus_Icon.svg";
import userEvent from "@testing-library/user-event";

vi.mock("react-svg", () => {
    return {
        ReactSVG: vi.fn((props) => (
            <div data-testid="svg_mock">{props.src}</div>
        )),
    };
});

afterEach(vi.restoreAllMocks);

describe("ControlButton tests", () => {
    it("renders without crashing", () => {
        render(<ControlButton buttonType="add" />);
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("renders the control buttons svg image", () => {
        render(<ControlButton buttonType="add" />);
        expect(screen.getByTestId("svg_mock")).toHaveTextContent(PlusIcon);
    });

    it("handles click events correctly", async () => {
        const mockHandleClick = vi.fn();
        const user = userEvent.setup();

        render(
            <ControlButton buttonType="add" handleClick={mockHandleClick} />
        );

        const button = screen.getByRole("button");
        await user.click(button);

        expect(mockHandleClick).toHaveBeenCalledTimes(1);
    });

    it("correctly attributes an aria label when provided as a prop", () => {
        const testLabel = "add";
        render(<ControlButton buttonType="add" label={testLabel} />);

        const button = screen.getByRole("button");
        expect(button).toHaveAttribute("aria-label", testLabel);
    });
});
