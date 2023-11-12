import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Error from "../Error";
import { MemoryRouter } from "react-router-dom";
import { useContext } from "react";

vi.mock("react", async () => {
    const library = await vi.importActual("react");
    return {
        ...library,
        useContext: vi.fn(),
    };
});

afterEach(vi.restoreAllMocks);

describe("Error page tests (user not signed in)", () => {
    beforeEach(() => {
        useContext.mockImplementation(() => {
            return {
                user: "",
            };
        });
    });

    it("renders without crashing", () => {
        render(<Error />, { wrapper: MemoryRouter });

        expect(
            screen.getByRole("heading", { name: /gym fail/i })
        ).toBeInTheDocument();
    });

    it("renders with the correct route if no user is signed in", () => {
        render(<Error />, { wrapper: MemoryRouter });

        expect(screen.getByRole("link")).toBeInTheDocument();
        expect(screen.getByRole("link")).toHaveAttribute("href", "/");
    });
});

describe("Error page tests (user signed in)", () => {
    beforeEach(() => {
        useContext.mockImplementation(() => {
            return {
                user: "John",
            };
        });
    });

    it("renders with the correct route if user is signed in", () => {
        render(<Error />, { wrapper: MemoryRouter });

        expect(screen.getByRole("link")).toBeInTheDocument();
        expect(screen.getByRole("link")).toHaveAttribute("href", "/user");
    });
});
