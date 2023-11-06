import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LogoutButton from "../LogoutButton";
import { MemoryRouter, BrowserRouter } from "react-router-dom";
import { signOut } from "firebase/auth";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
    const reactRouterLibrary = await vi.importActual("react-router-dom");
    return {
        ...reactRouterLibrary,
        useNavigate: vi.fn(() => mockNavigate),
    };
});

vi.mock("firebase/auth", () => {
    return {
        signOut: vi.fn(),
        getAuth: vi.fn(),
    };
});

afterEach(vi.restoreAllMocks);

describe("LogoutButton component tests", () => {
    it("renders without crashing", () => {
        render(<LogoutButton />, { wrapper: MemoryRouter });

        const logoutButton = screen.getByRole("button", { name: /log out/i });

        expect(logoutButton).toBeInTheDocument();
    });

    it("redirects to root route after LogoutButton is clicked", async () => {
        const user = userEvent.setup();
        render(<LogoutButton />, { wrapper: MemoryRouter });

        const logoutButton = screen.getByRole("button", { name: /log out/i });
        await user.click(logoutButton);

        expect(mockNavigate).toBeCalledWith("/");
    });

    it("doesn't call navigate when the button is not clicked", () => {
        render(<LogoutButton />, { wrapper: MemoryRouter });

        expect(mockNavigate).not.toHaveBeenCalled();
    });

    it("calls the firebase signOut method when button is clicked", async () => {
        const user = userEvent.setup();
        render(<LogoutButton />, { wrapper: MemoryRouter });
        const logoutButton = screen.getByRole("button", { name: /log out/i });

        await user.click(logoutButton);

        expect(signOut).toHaveBeenCalled();
    });

    it("handles errors with signing out gracefully", async () => {
        const user = userEvent.setup();
        render(<LogoutButton />, { wrapper: MemoryRouter });

        const logoutButton = screen.getByRole("button", { name: /log out/i });
        signOut.mockRejectedValue(new Error("Error signing out"));
        vi.spyOn(console, "error").mockImplementation(() => {});

        await user.click(logoutButton);

        expect(console.error).toHaveBeenCalledWith(
            new Error("Error signing out")
        );
    });
});
