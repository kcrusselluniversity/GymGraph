import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignInForm from "../SignInForm";

beforeEach(() => {
    render(<SignInForm />)
});

describe("Initial render tests", () => {
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
    })
});

describe("Form input tests", () => {
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

        expect(passwordField.value).toBe("12345")
    });

    it("hides the password fields input characters", () => {
        const passwordField = screen.getByLabelText("Password");

        expect(passwordField).toHaveAttribute('type', 'password')
    })
});

describe("Form submission tests", async () => {
    it("calls the handleSubmit function when the form is submitted", async () => {
        const emailField = screen.getByLabelText("Email Address");
        const passwordField = screen.getByLabelText("Password");
        const submitButton = screen.getByRole("button", { name: /log in/i})

        const user = userEvent.setup();
        await user.type(emailField, "example@gmail.com");
        await user.type(passwordField, "password");
        await user.click(submitButton);    
        
        // TODO: Write test to test the outcome of the handle submit function
    });
});
