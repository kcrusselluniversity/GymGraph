import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Signin from "../Signin";

beforeEach(() => {
    render(<Signin />)
})
describe("Signin page", () => {
    it("renders without crashing", () => {
        expect(screen.getByRole("heading").textContent).toBe("Login to GymGraph")
    })

    it("renders logo", () => {
        const logo = screen.getByRole("img", { name: "GymGraph" });
        expect(logo).toBeInTheDocument();
    });
})
