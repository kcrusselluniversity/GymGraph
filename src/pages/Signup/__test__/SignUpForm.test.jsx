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
        expect(screen.getByText(/start your journey/i)).toBeInTheDocument();
    });

    it("renders submit button", () => {
        const submitButton = screen.getByRole("button");

        expect(submitButton).toBeInTheDocument();
    });
});

// SignUpForm submission tests
describe.only("SignUpForm submission tests", () => {
    it.todo()
})

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
        expect(
            screen.getByText(/only alphabetic characters allowed/i)
        ).toBeInTheDocument();
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
        expect(
            screen.getByText(/only alphabetic characters allowed/i)
        ).toBeInTheDocument();
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
        expect(
            screen.getByText(/must be a valid email address/i)
        ).toBeInTheDocument();
    });
});

describe("date of birth input tests", () => {
    let input;

    beforeEach(() => {
        input = screen.getByRole("textbox", {
            name: /date of birth/i,
        });
    });

    it("renders with initial value set to an empty string", () => {
        expect(input.value).toBe("");
    });

    it("renders with correct placeholder", () => {
        expect(input.placeholder).toBe("DD/MM/YYYY");
    });

    it("allows users to enter a valid date", async () => {
        const user = userEvent.setup();

        await user.type(input, "01012000");
        expect(input.value).toBe("01/01/2000");
    });

    it("renders with the 'invalid input' styling when an invalid date is entered", async () => {
        const user = userEvent.setup();

        await user.type(input, "01013000");
        expect(input).toHaveAttribute('aria-invalid', 'true')
    });

    it("doesnt render with the 'invalid input' styling when a valid date is entered", async () => {
        const user = userEvent.setup();

        await user.type(input, "01012000");
        expect(input).toHaveAttribute('aria-invalid', 'false')
    });
});

describe("password input tests", () => {
    let input;

    beforeEach(() => {
        input = screen.getByLabelText("Password");
    });

    it("renders with initial value set to an empty string", () => {
        expect(input.value).toBe("");
    });

    it("renders with correct placeholder", () => {
        const placeholder = screen.getByLabelText("Password");

        expect(placeholder).toBeInTheDocument();
    });

    it("hides the password fields input characters", () => {
        expect(input).toHaveAttribute("type", "password");
    });

    it("updates with the correct user input", async () => {
        const user = userEvent.setup();
        await user.type(input, "password");
        expect(input.value).toBe("password");
    });

    it("shows error message with incorrect user input", async () => {
        const user = userEvent.setup();
        await user.type(input, "1");
        await user.tab();
        expect(
            screen.getByText(
                /password must contain 1 numeric character, 1 captial letter and be at least 8 characters long/i
            )
        ).toBeInTheDocument();
    });
});

describe("confirm password input tests", () => {
    let input;

    beforeEach(() => {
        input = screen.getByLabelText("Confirm Password");
    });

    it("renders with initial value set to an empty string", () => {
        expect(input.value).toBe("");
    });

    it("renders with correct placeholder", () => {
        const placeholder = screen.getByLabelText("Confirm Password");
        expect(placeholder).toBeInTheDocument();
    });

    it("hides the confirm password fields input characters", () => {
        expect(input).toHaveAttribute("type", "password");
    });

    it("updates with the correct user input", async () => {
        const user = userEvent.setup();
        await user.type(input, "confirmPassword");
        expect(input.value).toBe("confirmPassword");
    });

    it("shows error message when password and confirmPassword fields dont match", async () => {
        const user = userEvent.setup();
        const passwordField = screen.getByLabelText("Password");

        await user.type(passwordField, "password");
        await user.type(input, "1");
        await user.tab();
        expect(screen.getByText(/passwords must match/i)).toBeInTheDocument();
    });

    it("doesnt show error message when password and confirmPassword fields match", async () => {
        const user = userEvent.setup();
        const passwordField = screen.getByLabelText("Password");

        await user.type(passwordField, "password");
        await user.type(input, "password");
        await user.tab();
        expect(
            screen.queryByText(/passwords must match/i)
        ).not.toBeInTheDocument();
    });
});
