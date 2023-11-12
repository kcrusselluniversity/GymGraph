import { vi, it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

    it("receives correct function given onClick prop", async () => {
        const handleClickFunction = vi.fn();
        const user = userEvent.setup();

        render(<WithGoogleButton text="Continue" onClick={handleClickFunction}/>);
        const button = screen.getByRole("button", { name: /Continue/i });
        
        await user.click(button);

        expect(handleClickFunction).toBeCalledTimes(1);
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
