import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { useContext } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import userEvent from "@testing-library/user-event";
import Signup from "../Signup";
import App from "../../../App";
import { DEFAULT_AUTH_CONTEXT } from "../../../data/constants";

vi.mock("react", async () => {
    const library = await vi.importActual("react");

    return {
        ...library,
        useContext: vi.fn()
    };
});

afterEach(vi.restoreAllMocks);

describe("Sign up page tests", () => {
    beforeEach(() => {
        render(
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Signup />
            </LocalizationProvider>,
            { wrapper: BrowserRouter }
        );
    });

    it("renders without crashing", () => {
        const heading = screen.getByRole("heading");
        expect(heading.textContent).toMatch(/create your account/i);
    });

    it("renders logo", () => {
        const logo = screen.getByRole("img", { name: "GymGraph" });
        expect(logo).toBeInTheDocument();
    });

    it("renders sign up form", () => {
        const formSubmitButton = screen.getByRole("button", {
            name: /start your journey/i,
        });

        expect(formSubmitButton).toBeInTheDocument();
    });

    it("renders the 'with google' button", async () => {
        const signUpButton = screen.getByRole("button", {
            name: /with google/i,
        });

        expect(signUpButton).toBeInTheDocument();
    });
});

describe("Sign up page routing tests", () => {
    it("routes to the landing page when logo clicked", async () => {
        const user = userEvent.setup();
        useContext.mockReturnValue(DEFAULT_AUTH_CONTEXT)

        render(
            <MemoryRouter initialEntries={["/signup"]}>
                <App />
            </MemoryRouter>
        );

        const logo = screen.getByAltText("GymGraph");
        const link = logo.closest("a");

        await user.click(link);
        expect(
            screen.getByText(/discover strength unleashed/i)
        ).toBeInTheDocument();
    });
});
