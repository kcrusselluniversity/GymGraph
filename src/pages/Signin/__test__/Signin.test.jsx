import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Signin from "../Signin";
import userEvent from "@testing-library/user-event";
import App from '../../../App';

describe("Signin page", () => {
    it("renders without crashing", () => {
        render(<Signin />, { wrapper: MemoryRouter })
        
        expect(screen.getByRole("heading").textContent).toBe(
            "Login to GymGraph"
        );
    });

    it("renders logo", () => {
        render(<Signin />, { wrapper: MemoryRouter })
        const logo = screen.getByRole("img", { name: "GymGraph" });
        expect(logo).toBeInTheDocument();
    });

    it("renders logo with correct route", () => {
        render(<Signin />, { wrapper: MemoryRouter })
        const logo = screen.getByAltText("GymGraph");
        const link = logo.closest("a");

        expect(link).toHaveAttribute('href', '/')
    });

    it("routes to the landing page when logo clicked", async () => {
        const user = userEvent.setup();

        render(<MemoryRouter initialEntries={["/signin"]}>
            <App />
        </MemoryRouter>)

        const logo = screen.getByAltText("GymGraph");
        const link = logo.closest('a');

        await user.click(link);
        expect(screen.getByText(/discover strength unleashed/i)).toBeInTheDocument()
    })
});
