import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App routing tests", () => {
    it("renders default route correctly", async () => {
        render(<App />, { wrapper: MemoryRouter });

        // Confirm landing page is first page rendered
        expect(
            screen.getByText(/Discover Strength Unleashed./i)
        ).toBeInTheDocument();
    });

    it("correctly routes to sign up page after clicking signup button", async () => {
        render(<App />, { wrapper: MemoryRouter });

        const user = userEvent.setup();

        const signUpButton = screen.getByRole("link", { name: "Sign Up Now" });
        await user.click(signUpButton);
        expect(screen.getByText(/signup/i)).toBeInTheDocument();
    });

    it("correctly routes to sign in page after clicking signin link", async () => {
        render(<App />, { wrapper: MemoryRouter });

        const user = userEvent.setup();

        const signInButton = screen.getByRole("link", { name: "Sign in" });
        await user.click(signInButton);
        expect(screen.getByText(/signin/i)).toBeInTheDocument();
    });

    it("correctly render a bad page", () => {
        render(
            <MemoryRouter initialEntries={["/nonsensePageRequest"]}>
                <App />
            </MemoryRouter>
        );

        expect(screen.getByText(/404/i)).toBeInTheDocument();
    });
});
