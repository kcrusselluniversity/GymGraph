import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LogoutButton from "../LogoutButton";
import { MemoryRouter } from "react-router-dom";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
    const reactRouterLibrary = await vi.importActual("react-router-dom");
    return {
        ...reactRouterLibrary,
        useNavigate: vi.fn(() => mockNavigate),
    };
});

afterEach(vi.restoreAllMocks);

describe("LogoutButton component tests", () => {
    it("renders without crashing", () => {
        render(<LogoutButton />, { wrapper: MemoryRouter });

        const logoutButton = screen.getByRole("button", { name: /log out/i });
        
        expect(logoutButton).toBeInTheDocument();
    });

    it("redirects to root route after click", async () => {
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
});
