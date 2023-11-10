import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useContext } from "react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { defaultAuthContext } from "./data/constants";

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

describe("App routing tests", () => {
    it("renders default route correctly", async () => {
        useContext.mockReturnValue(defaultAuthContext);

        render(<App />, { wrapper: MemoryRouter });

        // Confirm landing page is first page rendered
        expect(
            screen.getByText(/Discover Strength Unleashed./i)
        ).toBeInTheDocument();
    });

    it("correctly routes to sign up page after clicking signup button", async () => {
        const user = userEvent.setup();
        useContext.mockReturnValue(defaultAuthContext);

        render(<App />, { wrapper: MemoryRouter });

        const signUpButton = screen.getByRole("link", { name: "Sign Up Now" });
        await user.click(signUpButton);
        expect(screen.getByText(/create your account/i)).toBeInTheDocument();
    });

    it("correctly routes to sign in page after clicking signin link", async () => {
        const user = userEvent.setup();
        useContext.mockReturnValue(defaultAuthContext);

        render(<App />, { wrapper: MemoryRouter });

        const signInButton = screen.getByRole("link", { name: "Sign in" });
        await user.click(signInButton);
        expect(screen.getByText(/Login to GymGraph/i)).toBeInTheDocument();
    });

    it("correctly render a bad page", () => {
        useContext.mockReturnValue(defaultAuthContext);

        render(
            <MemoryRouter initialEntries={["/nonsensePageRequest"]}>
                <App />
            </MemoryRouter>
        );

        expect(screen.getByText(/fail/i)).toBeInTheDocument();
    });
});
