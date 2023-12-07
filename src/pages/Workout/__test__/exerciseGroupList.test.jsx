import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import exerciseGroupList from "../utils/exerciseGroupList";

describe("exerciseGroupList tests", () => {
    it("renders without crashing given a valid exercise group", () => {
        const validExerciseGroup = "chest";

        render(exerciseGroupList(validExerciseGroup));
        expect(screen.getAllByText(/chest press/i)).not.toHaveLength(0);
    });

    it("renders without crashing given an invalid exercise group", () => {
        const validExerciseGroup = "tenticle";

        render(exerciseGroupList(validExerciseGroup));
        expect(screen.queryAllByTestId("exerciseNameItem")).toHaveLength(0);
    });
});
