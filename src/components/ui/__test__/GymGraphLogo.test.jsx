import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import GymGraphLogo from "../../GymGraphLogo";
import logo from "../../../assets/Logo.svg";

beforeEach(() => {
    render(<GymGraphLogo />);
});

describe("GymGraph Logo component", () => {
    it("renders without crashing", () => {
        expect(screen.getByRole("img")).toBeInTheDocument();
    });

    it("renders with the correct logo alt text", () => {
        const logoAltText = screen.getByAltText("GymGraph");
        expect(logoAltText).toBeInTheDocument();
    });

    it("renders the logo image", () => {
        const image = screen.getByRole("img");
        expect(image).toHaveAttribute("src", logo);
    });
});
