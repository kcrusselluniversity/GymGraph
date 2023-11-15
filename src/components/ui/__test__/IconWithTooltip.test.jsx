import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import IconWithTooltip from "../IconWithTooltip";

// Mock the reactSVG component as it makes network requests
// under the hood which is not desired in our unit tests
vi.mock("react-svg", () => {
    return {
        ReactSVG: vi.fn(() => <div>icon</div>),
    };
});

afterEach(vi.restoreAllMocks);

describe("IconWithTooltip tests", () => {
    it("renders without crashing", () => {
        render(<IconWithTooltip icon="path/to/icon.svg" title="Test"/>)
        const tooltip = screen.getByTestId("tooltip")
        expect(tooltip).toBeInTheDocument();
    })
    it("displays the correct tooltip text passed as a prop", () => {
        render(<IconWithTooltip icon="path/to/icon.svg" title="Test Title"/>)
        const tooltip = screen.getByTestId("tooltip")
        expect(tooltip).toHaveAttribute('aria-label', 'Test Title')
    })
})