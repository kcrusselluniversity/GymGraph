import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Landing from "../Landing";

describe("Landing page", () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <Landing />
            </MemoryRouter>
        );
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
