import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Loading from "../Loading";

describe("Loading component tests", () => {
    it("renders without crashing", () => {
        render(<Loading />)
        expect(screen.getByRole("progressbar")).toBeInTheDocument();
    })
})