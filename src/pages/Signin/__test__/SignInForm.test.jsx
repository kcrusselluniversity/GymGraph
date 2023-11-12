import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignInForm from "../SignInForm";
import { MemoryRouter } from "react-router-dom";
import handleSignIn from "../utils/handleSignIn";

describe("Initial render tests", () => {
    beforeEach(() => {
        render(<SignInForm />, { wrapper: MemoryRouter });
    });

    it("renders without crashing", () => {
        expect(
            screen.getByRole("button", { name: "Log In" })
        ).toBeInTheDocument();
    });

    it("renders the text fields with the correct names", () => {
        const emailField = screen.getByLabelText("Email Address");
        expect(emailField).toHaveAttribute("name", "email");

        const passwordField = screen.getByLabelText("Password");
        expect(passwordField).toHaveAttribute("name", "password");
    });

    it("renders the text fields with empty values", () => {
        const emailField = screen.getByLabelText("Email Address");
        expect(emailField.value).toBe("");

        const passwordField = screen.getByLabelText("Password");
        expect(passwordField.value).toBe("");
    });
});

describe("Form input tests", () => {
    beforeEach(() => {
        render(<SignInForm />, { wrapper: MemoryRouter });
    });

    it("handles input being typed into email form field", async () => {
        const emailField = screen.getByLabelText("Email Address");

        const user = userEvent.setup();
        await user.type(emailField, "example@gmail.com");

        expect(emailField.value).toBe("example@gmail.com");
    });

    it("handles input being typed into password form field", async () => {
        const passwordField = screen.getByLabelText("Password");

        const user = userEvent.setup();
        await user.type(passwordField, "12345");

        expect(passwordField.value).toBe("12345");
    });

    it("hides the password fields input characters", () => {
        const passwordField = screen.getByLabelText("Password");

        expect(passwordField).toHaveAttribute("type", "password");
    });
});

describe("Form submission tests", async () => {
    vi.mock("../utils/handleSignIn");

    it("calls the handleSignIn function when the form is submitted", async () => {
        handleSignIn.mockImplementation((e) => {
            e.preventDefault();
        });

        const user = userEvent.setup();
        render(<SignInForm />, { wrapper: MemoryRouter });

        const emailField = screen.getByLabelText("Email Address");
        const passwordField = screen.getByLabelText("Password");
        const submitButton = screen.getByRole("button", { name: /log in/i });

        await user.type(emailField, "example@gmail.com");
        await user.type(passwordField, "password");
        await user.click(submitButton);

        expect(handleSignIn).toHaveBeenCalledTimes(1);
    });

    it("displays a loading spinner when the form is submitted", async () => {
        handleSignIn.mockImplementation(
            (e, formData, setFormSubmissionError, setIsLoading) => {
                e.preventDefault();
                setIsLoading(true);
            }
        );

        const user = userEvent.setup();
        render(<SignInForm />, { wrapper: MemoryRouter });

        const emailField = screen.getByLabelText("Email Address");
        const passwordField = screen.getByLabelText("Password");
        const submitButton = screen.getByRole("button", { name: /log in/i });

        await user.type(emailField, "example@gmail.com");
        await user.type(passwordField, "password");
        await user.click(submitButton);

        await waitFor(() => {
            const loadingSpinner = screen.getByRole("progressbar");
            expect(loadingSpinner).toBeInTheDocument();
        })
    });

    it("renders an error message if the input is invalid", async () => {
        handleSignIn.mockImplementation(
            (e, formData, setFormSubmissionError) => {
                e.preventDefault();
                setFormSubmissionError("Test Error Message");
            }
        );

        const user = userEvent.setup();
        render(<SignInForm />, { wrapper: MemoryRouter });

        const emailField = screen.getByLabelText("Email Address");
        const passwordField = screen.getByLabelText("Password");
        const submitButton = screen.getByRole("button", { name: /log in/i });

        await user.type(emailField, "email@email.com");
        await user.type(passwordField, "PasswordNumber1");
        await user.click(submitButton);

        await waitFor(() => {
            const errorElement = screen.getByTestId("errorMessage");
            expect(errorElement).toBeInTheDocument();
        });
    });
});
