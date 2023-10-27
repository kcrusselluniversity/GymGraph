import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Landing from "../Landing";

describe("Landing page tests", () => {
    beforeEach(() => {
        render(<Landing />, { wrapper: BrowserRouter });
    });

    it("renders without crashing", () => {
        const mainTitle = screen.getByText(/Discover Strength Unleashed./i);
        expect(mainTitle).toBeInTheDocument();
    });

    it("renders logo", () => {
        const logo = screen.getByRole("img", { name: "GymGraph" });
        expect(logo).toBeInTheDocument();
    });

    it("has a sign up button", async () => {
        const signUpButton = screen.getByRole("link", {
            name: "Sign Up Now",
        });

        expect(signUpButton).toBeInTheDocument();
    });
});
