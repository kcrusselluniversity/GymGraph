import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import SearchBar from "../SearchBar";
import userEvent from "@testing-library/user-event";

afterEach(vi.restoreAllMocks);

describe("SearchBar component tests", () => {
    it("renders without crashing", () => {
        render(
            <SearchBar
                placeholder="Search ..."
                state={{ searchInput: "", setSearchInput: () => {} }}
            />
        );
        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("updates the textbox field when user enters text", async () => {
        const user = userEvent.setup();
        const setSearchInputMock = vi.fn();

        render(
            <SearchBar
                placeholder="Search ..."
                state={{ searchInput: "", setSearchInput: setSearchInputMock }}
            />
        ); 
        
        const textbox = screen.getByRole("textbox");
        await user.type(textbox, "t")
        expect(setSearchInputMock).toBeCalledWith("t");
    })
});
