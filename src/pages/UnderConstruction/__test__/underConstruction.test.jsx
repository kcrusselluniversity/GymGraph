import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { useContext } from "react";
import underConstructionImage from "../../../assets/images/under_construction_image_compressed.png";
import UnderConstruction from "../UnderConstruction";
import App from "../../../App";
import { DEFAULT_AUTH_CONTEXT, USER_AUTH_CONTEXT } from "../../../data/constants";

vi.mock("react", async () => {
    const library = await vi.importActual("react");

    return {
        ...library,
        useContext: vi.fn(),
    };
});

// Mock the reactSVG component as it appears to make network requests
// under the hood which is not desired in our unit tests
vi.mock("react-svg", () => {
    return {
        ReactSVG: vi.fn(() => <div>icon</div>),
    };
});

afterEach(vi.restoreAllMocks);

describe("underConstruction page", () => {
    beforeEach(() => {
        useContext.mockReturnValue(DEFAULT_AUTH_CONTEXT);
        render(<UnderConstruction />, { wrapper: MemoryRouter });
    });

    it("renders without crashing", () => {
        expect(screen.getByRole("heading")).toBeInTheDocument();
    });

    it("renders with the correct alt text for the image", () => {
        expect(
            screen.getByAltText("page under construction")
        ).toBeInTheDocument();
    });

    it("renders the underConstruction image", () => {
        const image = screen.getByRole("img", {
            name: "page under construction",
        });
        expect(image).toHaveAttribute("src", underConstructionImage);
    });
});

describe("underConstruction page routing", () => {
    it("routes to the landing when logo clicked if the user is not signed in", async () => {
        const user = userEvent.setup();
        useContext.mockReturnValue(DEFAULT_AUTH_CONTEXT);

        render(
            <MemoryRouter initialEntries={["/underConstruction"]}>
                <App />
            </MemoryRouter>
        );

        const logo = screen.getByAltText("GymGraph");
        const link = logo.closest("a");

        await user.click(link);
        expect(
            screen.getByRole("heading", {
                name: /discover strength unleashed/i,
            })
        ).toBeInTheDocument();
    });

    it("routes to the dashboard when logo clicked if the user is signed in", async () => {
        const user = userEvent.setup();
        useContext.mockReturnValue(USER_AUTH_CONTEXT);

        render(
            <MemoryRouter initialEntries={["/underConstruction"]}>
                <App />
            </MemoryRouter>
        );
        const logo = screen.getByAltText("GymGraph");
        const link = logo.closest("a");
        
        await user.click(link);
  
        const header = screen.getByRole("heading", { name: "Dashboard" });
        expect(header).toBeInTheDocument();
    });
});
