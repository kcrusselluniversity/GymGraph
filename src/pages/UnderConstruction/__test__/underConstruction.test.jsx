import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { useContext } from "react";
import underConstructionImage from "../../../assets/images/under_construction_image_compressed.png";
import UnderConstruction from "../UnderConstruction";
import App from "../../../App";
import { defaultAuthContext, userAuthContext } from "../../../data/constants";

vi.mock("react", async () => {
    const library = await vi.importActual("react");

    return {
        ...library,
        useContext: vi.fn(),
    };
});

afterEach(() => {
    vi.restoreAllMocks();
});

describe("underConstruction page", () => {
    beforeEach(() => {
        useContext.mockReturnValue(defaultAuthContext);
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
    it("routes to the dashboard when logo clicked if the user is signed in", async () => {
        const user = userEvent.setup();
        useContext.mockReturnValue(userAuthContext);

        render(
            <MemoryRouter initialEntries={["/underConstruction"]}>
                <App />
            </MemoryRouter>
        );

        const logo = screen.getByAltText("GymGraph");
        const link = logo.closest("a");

        await user.click(link);
        expect(
            screen.getByRole("heading", { name: "Dashboard" })
        ).toBeInTheDocument();
    });
    
    it("routes to the landing when logo clicked if the user is not signed in", async () => {
        const user = userEvent.setup();
        useContext.mockReturnValue(defaultAuthContext);

        render(
            <MemoryRouter initialEntries={["/underConstruction"]}>
                <App />
            </MemoryRouter>
        );

        const logo = screen.getByAltText("GymGraph");
        const link = logo.closest("a");

        await user.click(link);
        expect(
            screen.getByRole("heading", { name: /discover strength unleashed/i })
        ).toBeInTheDocument();
    });
});
