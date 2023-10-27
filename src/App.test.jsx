import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App routing tests", () => {
    beforeEach(() => {
        render(<App />, { wrapper: BrowserRouter });
    });

    it("renders default route correctly", async () => {
        // Confirm landing page is first page rendered
        expect(
            screen.getByText(/Discover Strength Unleashed./i)
        ).toBeInTheDocument();
    });

    it("correctly routes to sign up page after clicking signup button", async () => {
        const user = userEvent.setup();

        const signUpButton = screen.getByRole('link', { name: 'Sign Up Now'})
        await user.click(signUpButton)
        expect(screen.getByText(/Signup/i)).toBeInTheDocument();
    });
});
