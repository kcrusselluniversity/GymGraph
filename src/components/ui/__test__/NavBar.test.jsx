import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { useMediaQuery } from "@mui/material";
import NavBar from "../NavBar";
import { MemoryRouter } from "react-router-dom";

// Mock the reactSVG component as it makes network requests
// under the hood which is not desired in our unit tests
vi.mock("react-svg", () => {
    return {
        ReactSVG: vi.fn(() => <div>icon</div>),
    };
});

vi.mock("@mui/material", async () => {
    const library = vi.importActual("@mui/material");
    return {
        ...library,
        useMediaQuery: vi.fn(),
    };
});

afterEach(vi.restoreAllMocks);

describe("Navbar tests", () => {
    it("renders without crashing", () => {
        // Mock query function to set isSmallScreen to false
        useMediaQuery.mockReturnValue(false);

        render(<NavBar />, { wrapper: MemoryRouter });

        expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
    });

    it("renders with only the icons when the screen size is small", () => {
        // Mock query function to set isSmallScreen to true
        useMediaQuery.mockReturnValue(true);

        render(<NavBar />, { wrapper: MemoryRouter });

        expect(screen.queryByText(/dashboard/i)).not.toBeInTheDocument();
        expect(screen.queryAllByTestId("tooltip").length).not.toEqual(0);
    });
});
