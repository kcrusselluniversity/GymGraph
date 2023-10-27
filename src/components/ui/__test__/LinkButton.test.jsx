import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LinkButton from "../LinkButton";

describe("LinkButton tests", () => {
    it("renders without crashing", () => {
        render(<LinkButton />, { wrapper: MemoryRouter });
        expect(screen.getByText(/Button/i)).toBeInTheDocument();
    });

    it("sets correct text given text prop", () => {
        render(<LinkButton text="Test Button" />, { wrapper: MemoryRouter });
        expect(screen.getByRole("link").textContent).toBe("Test Button");
    });

    it("applies correct class-name given prop", () => {
        render(<LinkButton className="myButton" />, { wrapper: MemoryRouter });
        expect(screen.getByRole("link")).toHaveClass("myButton");
    });

    it("sets correct href given 'to' prop", () => {
        render(<LinkButton to="/page" />, { wrapper: MemoryRouter });
        expect(screen.getByRole("link")).toHaveAttribute("href", "/page");
    });
});
