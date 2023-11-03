import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SignUpForm from "../SignUpForm";
import userEvent from "@testing-library/user-event";

// Render the SignUpForm before all tests
beforeEach(() => {
    render(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <SignUpForm />
        </LocalizationProvider>,
        { wrapper: BrowserRouter }
    );
});

// SignUpForm general tests
describe("SignUpForm component tests", () => {
    it("renders without crashing", () => {
        const submitButton = screen.getByRole("button", {
            name: /start your journey/i,
        });

        expect(submitButton).toBeInTheDocument();
    });
});

// SignUpForm submission tests

// SignUpForm individual input tests
describe("First name input tests", () => {
    let input;

    beforeEach(() => {
        input = screen.getByRole("textbox", {
            name: /first name/i,
        });
    });

    it("renders with initial value set to an empty string", () => {
        expect(input.value).toBe("");
    });

    it("renders with correct placeholder", () => {
        const placeholder = screen.getByLabelText("First name");

        expect(placeholder).toBeInTheDocument();
    });

    it("updates with the correct user input", async () => {
        const user = userEvent.setup();
        await user.type(input, "John");
        expect(input.value).toBe("John");
    });
    
    it("shows error message with incorrect user input", async () => {
        const user = userEvent.setup();
        await user.type(input, "1John");
        await user.tab();
        expect(screen.getByText(/only alphabetic characters allowed/i)).toBeInTheDocument();
    });
 
    it("shows no error message with correct user input", async () => {
        const user = userEvent.setup();
        await user.type(input, "John");
        await user.tab();
        expect(screen.queryByText(/name required/i)).not.toBeInTheDocument();
    });
});

describe("Last name input tests", () => {
    let input;

    beforeEach(() => {
        input = screen.getByRole("textbox", {
            name: /last name/i,
        });
    });

    it("renders with initial value set to an empty string", () => {
        expect(input.value).toBe("");
    });

    it("renders with correct placeholder", () => {
        const placeholder = screen.getByLabelText("Last name");

        expect(placeholder).toBeInTheDocument();
    });

    it("updates with the correct user input", async () => {
        const user = userEvent.setup();
        await user.type(input, "Smith");
        expect(input.value).toBe("Smith");
    });

    it("shows error message with incorrect user input", async () => {
        const user = userEvent.setup();
        await user.type(input, "1Smith");
        await user.tab();
        expect(screen.getByText(/only alphabetic characters allowed/i)).toBeInTheDocument();
    });

    it("shows no error message with correct user input", async () => {
        const user = userEvent.setup();
        await user.type(input, "Smith");
        await user.tab();
        expect(screen.queryByText(/name required/i)).not.toBeInTheDocument();
    });
});

describe("Email address input tests", () => {
    let input;

    beforeEach(() => {
        input = screen.getByRole("textbox", {
            name: /email address/i,
        });
    });

    it("renders with initial value set to an empty string", () => {
        expect(input.value).toBe("");
    });

    it("renders with correct placeholder", () => {
        const placeholder = screen.getByLabelText("Email Address");

        expect(placeholder).toBeInTheDocument();
    });

    it("updates with the correct user input", async () => {
        const user = userEvent.setup();
        await user.type(input, "email@domain.com");
        expect(input.value).toBe("email@domain.com");
    });

    it("shows error message with incorrect user input", async () => {
        const user = userEvent.setup();
        await user.type(input, "notanemail");
        await user.tab();
        expect(screen.getByText(/must be a valid email address/i)).toBeInTheDocument();
    });
});
