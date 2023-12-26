import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ExerciseItem from "../components/ExerciseItem";
import ExerciseModalProvider from "../../../context/ExerciseModalProvider";

const testExercise = {
    uid: "123",
    muscleGroup: "chest",
    name: "push up",
};

const testSets = [
    { weight: 20, reps: 10 },
    { weight: 20, reps: 9 },
    { weight: 20, reps: 8 },
];

describe("ExerciseItem component tests", () => {
    it("renders without crashing with valid data", () => {
        render(<ExerciseItem sets={testSets} exerciseObject={testExercise} />, {
            wrapper: ExerciseModalProvider,
        });
        expect(screen.getByText(/push up/i)).toBeInTheDocument();
    });

    it("renders without crashing when no prop given", () => {
        render(<ExerciseItem />, {
            wrapper: ExerciseModalProvider,
        });
        expect(screen.queryByText(/exercise/i)).not.toBeInTheDocument();
    });

    it("renders nothing when there are no sets present", () => {
        render(<ExerciseItem exerciseObject={testExercise} />, {
            wrapper: ExerciseModalProvider,
        });
        expect(screen.queryByText(/exercise/i)).not.toBeInTheDocument();
    });

    it("renders the correct number of rows for the given number of sets", () => {
        render(<ExerciseItem sets={testSets} exerciseObject={testExercise} />, {
            wrapper: ExerciseModalProvider,
        });
        const totalRows = screen.getAllByRole("row").length;
        const setRows = totalRows - 1; // As the head row is not a set row
        expect(setRows).toBe(testSets.length);
    });
});
