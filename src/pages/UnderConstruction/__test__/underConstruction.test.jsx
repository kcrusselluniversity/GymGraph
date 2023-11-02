import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import UnderConstruction from "../UnderConstruction";
import underConstructionImage from "../../../assets/images/under_construction_image_compressed.png";

beforeEach(() => {
    render(<UnderConstruction />);
});

describe("underConstruction page", () => {
    it("renders without crashing", () => {
        expect(screen.getByRole("heading")).toBeInTheDocument();
    });

    it("renders with the correct alt text for the image", () => {
        expect(
            screen.getByAltText("page under construction")
        ).toBeInTheDocument();
    });

    it("renders the underConstruction image", () => {
        const image = screen.getByRole("img", {
            name: "page under construction",
        });
        expect(image).toHaveAttribute("src", underConstructionImage);
    });
});
