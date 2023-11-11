import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import UserPageLayout from "../UserPageLayout";
import { MemoryRouter } from "react-router-dom";

vi.mock('react-router-dom', async () => {
    const reactRouterLibrary = await vi.importActual('react-router-dom')
    return {
        ...reactRouterLibrary,
        Outlet: vi.fn(() => <div data-testid="mock-outlet"></div>)
    }
})

// Mock the reactSVG component as it appears to make network requests
// under the hood which is not desired in our unit tests
vi.mock("react-svg", () => {
    return {
        ReactSVG: vi.fn(() => <div>icon</div>),
    };
});


describe("UserPageLayout tests", () => {
    it("renders without crashing", () => {
        render(<UserPageLayout />, { wrapper: MemoryRouter });
        expect(
            screen.getByRole("link", { name: /dashboard/i })
        ).toBeInTheDocument();
    });

    it("renders <Outlet /> child component", () => {
        render(<UserPageLayout />, { wrapper: MemoryRouter });
        const outletComponent = screen.getByTestId('mock-outlet');
        expect(outletComponent).toBeInTheDocument();
    })
});
