import { vi, it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import WithGoogleButton from "../WithGoogleButton";

describe("WithGoogleButton component", () => {
    it("renders without crashing", () => {
        render(<WithGoogleButton text="Test" />);
        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
    });

    it("renders with the correct logo alt text", () => {
        render(<WithGoogleButton text="Test" />);
        const iconAltText = screen.getByAltText("Google Icon");
        expect(iconAltText).toBeInTheDocument();
    });

    it("displays the correct text given text prop", () => {
        render(<WithGoogleButton text="Continue" />);
        const button = screen.getByRole("button", { name: /Continue/i });
        expect(button).toBeInTheDocument();
    });

    it("warns when 'text' prop not provided to component", () => {
        const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

        render(<WithGoogleButton />);

        expect(spy).toHaveBeenCalled();

        spy.mockRestore();
    });
});
