import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useContext } from "react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { DEFAULT_AUTH_CONTEXT, USER_AUTH_CONTEXT } from "./data/constants";

vi.mock("react", async () => {
    const library = await vi.importActual("react");

    return {
        ...library,
        useContext: vi.fn(),
    };
});

// Mock the reactSVG component as it appears to make network requests
// under the hood which is not desired in our unit tests
vi.mock("react-svg", () => {
    return {
        ReactSVG: vi.fn(() => <div>icon</div>),
    };
});

// Mock the Dashboard components that make async calls
// We do this as we are only testing the routing to dashboard, not the
// contents
vi.mock("./pages/Dashboard/components/Calendar", () => {
    return { default: () => <div>Calendar</div> };
});
vi.mock("./pages/Dashboard/components/MuscleGroupPieChart", () => {
    return { default: () => <div>Pie Chart</div> };
});
vi.mock("./pages/Dashboard/components/VolumePerSessionGraph", () => {
    return { default: () => <div>Volume Graph</div> };
});
vi.mock("./context/HistoryProvider", () => {
    return { default: ({children}) => <div>{children}</div> };
});
vi.mock("@mui/material", async () => {
    const lib = await vi.importActual("@mui/material")
    return {
        ...lib,
        Dialog: () => <div>Dialog</div>
    }
})

afterEach(vi.restoreAllMocks);

describe("App routing tests", () => {
    beforeEach(() => {
        useContext.mockReturnValue({ user: "", isLoading: true });
    });

    describe("loading routes tests", () => {
        it("renders a loading spinner when the page is loading", () => {
            render(<App />, { wrapper: MemoryRouter });
            expect(screen.getByRole("progressbar")).toBeInTheDocument();
        });
    });

    describe("user not signed in tests", () => {
        beforeEach(() => {
            // Set the auth to reflect no user signed in yet
            useContext.mockReturnValue(DEFAULT_AUTH_CONTEXT);
        });

        it("renders default route correctly", async () => {
            render(<App />, { wrapper: MemoryRouter });

            // Confirm landing page is first page rendered
            expect(
                screen.getByText(/Discover Strength Unleashed./i)
            ).toBeInTheDocument();
        });

        it("correctly routes to sign up page after clicking signup button", async () => {
            const user = userEvent.setup();
            render(<App />, { wrapper: MemoryRouter });

            const signUpButton = screen.getByRole("link", {
                name: "Sign Up Now",
            });

            await user.click(signUpButton);
            expect(
                screen.getByText(/create your account/i)
            ).toBeInTheDocument();
        });

        it("correctly routes to sign in page after clicking signin link", async () => {
            const user = userEvent.setup();

            render(<App />, { wrapper: MemoryRouter });

            const signInButton = screen.getByRole("link", { name: "Sign in" });
            await user.click(signInButton);
            expect(screen.getByText(/Login to GymGraph/i)).toBeInTheDocument();
        });

        it("correctly render a bad page", () => {
            render(
                <MemoryRouter initialEntries={["/nonsensePageRequest"]}>
                    <App />
                </MemoryRouter>
            );

            expect(screen.getByText(/fail/i)).toBeInTheDocument();
        });
    });

    describe("user signed in routing tests", () => {
        beforeEach(() => {
            // Set the auth to reflect a user is signed in
            useContext.mockReturnValue(USER_AUTH_CONTEXT);
        });

        it("routes to the users dashboard for the root route", () => {
            render(<App />, { wrapper: MemoryRouter });

            const dashboardNavBarElement = screen.getByRole("link", {
                name: /dashboard/i,
            });

            // Check that the dashboard is the active page
            expect(dashboardNavBarElement).toHaveClass("active");
        });

        it("routes to the dashboard when the user manually tries to route to the signin page", () => {
            render(
                <MemoryRouter initialEntries={["/signin"]}>
                    <App />
                </MemoryRouter>
            );

            const dashboardNavBarElement = screen.getByRole("link", {
                name: /dashboard/i,
            });

            // Check that the dashboard is the active page
            expect(dashboardNavBarElement).toHaveClass("active");
        });

        it("routes to the dashboard when the user manually tries to route to the signup page", () => {
            render(
                <MemoryRouter initialEntries={["/signup"]}>
                    <App />
                </MemoryRouter>
            );

            const dashboardNavBarElement = screen.getByRole("link", {
                name: /dashboard/i,
            });

            // Check that the dashboard is the active page
            expect(dashboardNavBarElement).toHaveClass("active");
        });

        it("routes to the dashboard when the user manually tries to route to the landing page", () => {
            render(
                <MemoryRouter initialEntries={["/"]}>
                    <App />
                </MemoryRouter>
            );

            const dashboardNavBarElement = screen.getByRole("link", {
                name: /dashboard/i,
            });

            // Check that the dashboard is the active page
            expect(dashboardNavBarElement).toHaveClass("active");
        });
    });
});
