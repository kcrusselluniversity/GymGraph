import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import UnderConstruction from "../UnderConstruction";
import underConstructionImage from "../../../assets/images/under_construction_image_compressed.png";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import App from '../../../App';

vi.mock("react", async () => {
    const library = await vi.importActual("react");

    const defaultTestUser = {
        user: "John",
        isLoading: false,
    };

    return {
        ...library,
        useContext: vi.fn().mockReturnValue(defaultTestUser),
    };
});

describe("underConstruction page", () => {
    beforeEach(() => {
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
    it("routes to landing page when logo clicked", async () => {
        const user = userEvent.setup();

        render(<MemoryRouter initialEntries={["/underConstruction"]}>
            <App />
        </MemoryRouter>)
      
        const logo = screen.getByAltText("GymGraph");
        const link = logo.closest('a');

        await user.click(link);
        expect(screen.getByText(/discover strength unleashed/i)).toBeInTheDocument()
    })
})