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
