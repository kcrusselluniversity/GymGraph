import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import SearchBar from "../SearchBar";
import userEvent from "@testing-library/user-event";

afterEach(vi.restoreAllMocks);

describe("SearchBar component tests", () => {
    it("renders without crashing", () => {
        render(<SearchBar />);
        expect(
            screen.getByRole("button", { name: "search" })
        ).toBeInTheDocument();
    });

    it("renders without crashing when no props supplied", () => {
        render(<SearchBar />);
        expect(
            screen.getByRole("button", { name: "search" })
        ).toBeInTheDocument();
    });

    it("renders without crashing when named prop supplied", () => {
        render(<SearchBar handleSearch={() => {}} />);
        expect(
            screen.getByRole("button", { name: "search" })
        ).toBeInTheDocument();
    });

    it("renders correct element when extra props are supplied", () => {
        render(<SearchBar name="exercise" id="exerciseSearch" />);
        const input = screen.getByRole("textbox");

        expect(input).toHaveAttribute("name", "exercise");
        expect(input).toHaveAttribute("id", "exerciseSearch");
    });

    it("calls the handleSearch function when user submits the form", async () => {
        const handleSearchMock = vi.fn();
        const user = userEvent.setup();

        render(<SearchBar handleSearch={handleSearchMock} />);

        await user.click(screen.getByRole("button", { name: "search" }));

        expect(handleSearchMock).toHaveBeenCalledTimes(1);
    });
});
