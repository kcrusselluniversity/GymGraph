import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import ProtectedRoute from "../ProtectedRoute";
import { MemoryRouter, Route, Routes } from "react-router-dom";

afterEach(vi.restoreAllMocks);

describe("ProtectedRoute component tests", () => {
    describe("User is unauthorised tests", () => {
        it("routes user to root route page if no redirectRoute prop given", () => {
            render(
                <MemoryRouter initialEntries={["/protectedRoute"]}>
                    <Routes>
                        <Route
                            path="/protectedRoute"
                            element={<ProtectedRoute isAuthorised={false} />}
                        />
                        <Route
                            path="/"
                            element={<div>Landing Page</div>}
                        ></Route>
                    </Routes>
                </MemoryRouter>
            );

            expect(screen.getByText(/landing page/i)).toBeInTheDocument();
        });

        it("routes user to correct route if redirectPath prop given", () => {
            render(
                <MemoryRouter initialEntries={["/protectedRoute"]}>
                    <Routes>
                        <Route
                            path="/protectedRoute"
                            element={<ProtectedRoute isAuthorised={false} redirectPath="/dashboard"/>}
                        />
                        <Route
                            path="/dashboard"
                            element={<div>Dashboard Page</div>}
                        />
                    </Routes>
                </MemoryRouter>
            );

            expect(screen.getByText(/dashboard page/i)).toBeInTheDocument();
        });
    });

    describe("User is authorised tests", () => {
        // Mock Outlet component for testing purposes
        vi.mock("react-router-dom", async () => {
            const library = await vi.importActual("react-router-dom");
            return {
                ...library,
                Outlet: vi.fn(() => <div>Outlet</div>),
            };
        });

        it("Renders Outlet component if user is authorised and no children", () => {
            render(
                <MemoryRouter initialEntries={["/protectedRoute"]}>
                    <Routes>
                        <Route
                            path="/protectedRoute"
                            element={<ProtectedRoute isAuthorised />}
                        />
                    </Routes>
                </MemoryRouter>
            );

            expect(screen.getByText(/outlet/i)).toBeInTheDocument();
        });

        it("Renders children if user is authorised", () => {
            render(
                <MemoryRouter initialEntries={["/protectedRoute"]}>
                    <Routes>
                        <Route
                            path="/protectedRoute"
                            element={
                                <ProtectedRoute isAuthorised>
                                    <div>Child component</div>
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </MemoryRouter>
            );
   
            expect(screen.getByText(/child component/i)).toBeInTheDocument();
        });
    });
});
