import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LogoutButton from "../LogoutButton";
import { MemoryRouter } from "react-router-dom";

describe("LogoutButton component tests", () => {
    beforeEach(() => {
        render(<LogoutButton />, { wrapper: MemoryRouter });
    });

    it("renders without crashing", () => {
        const logoutButton = screen.getByRole("link", { name: /log out/i });
        expect(logoutButton).toBeInTheDocument();
    });

    it("links to the landing page", () => {
        const logoutButton = screen.getByRole("link", { name: /log out/i });
        expect(logoutButton).toHaveAttribute('href', '/')
    });
});
