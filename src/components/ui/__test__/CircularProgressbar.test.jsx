import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CircularProgressbar from "../CircularProgressbar";

describe("CircularProgressbar tests", () => {
    it("renders with default props without crashing", () => {
        render(<CircularProgressbar>Hello, World!</CircularProgressbar>);

        const text = screen.getByText(/hello, world/i);
        expect(text).toBeInTheDocument();
    });

    it("renders with custom props without crashing", () => {
        render(
            <CircularProgressbar percentage={0.5} diameter={100}>
                Hello, World!
            </CircularProgressbar>
        );

        const text = screen.getByText(/hello, world/i);
        expect(text).toBeInTheDocument();
    });

    it("renders the progressbar with the correct percentage", () => {
        const initialPercentage = 0.5;
        render(
            <CircularProgressbar percentage={initialPercentage}>
                Hello, World!
            </CircularProgressbar>
        );

        const progressbar = screen.getByTestId("svg");
        const circle = progressbar.querySelector("circle");
        const percentage =
            circle.getAttribute("stroke-dashoffset") /
            circle.getAttribute("stroke-dasharray");

        expect(percentage).toEqual(initialPercentage);
    });

    it("updates the progress bar when percentage changes", () => {
        const initialPercentage = 0.5;
        const newPercentage = 0.41;
        const { rerender } = render(
            <CircularProgressbar percentage={initialPercentage}>
                Hello, World!
            </CircularProgressbar>
        );

        const progressbar = screen.getByTestId("svg");
        const circle = progressbar.querySelector("circle");
        const percentage = 1 - 
            circle.getAttribute("stroke-dashoffset") /
            circle.getAttribute("stroke-dasharray");

        expect(percentage).toEqual(initialPercentage);

        rerender(<CircularProgressbar percentage={newPercentage} />);

        const updatedProgressbar = screen.getByTestId("svg");
        const updatedCircle = updatedProgressbar.querySelector("circle");
        let updatedPercentage = 1 - 
            updatedCircle.getAttribute("stroke-dashoffset") /
            updatedCircle.getAttribute("stroke-dasharray");
        updatedPercentage = Math.round(updatedPercentage * 100)/100

        expect(updatedPercentage).toEqual(newPercentage);
    });
});
