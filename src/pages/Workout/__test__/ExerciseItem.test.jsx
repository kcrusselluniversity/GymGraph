import { describe, it, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import ExerciseItem from "../components/ExerciseItem";

const testExercise = {
    name: "push up",
    sets: [
        { weight: 20, reps: 10 },
        { weight: 20, reps: 9 },
        { weight: 20, reps: 8 },
    ],
};

describe("ExerciseItem component tests", () => {
    it("renders without crashing with valid data", () => {
        render(<ExerciseItem exercise={testExercise} />);
        expect(screen.getByText(/push up/i)).toBeInTheDocument();
    });

    it("renders without crashing when no prop given", () => {
        render(<ExerciseItem />);
        expect(screen.queryByText(/exercise/i)).not.toBeInTheDocument();
    });

    it("renders nothing when the exercise prop object has no sets attribute", () => {
        render(<ExerciseItem exercise={{ exercise: "push up" }} />);
        expect(screen.queryByText(/exercise/i)).not.toBeInTheDocument();
    });

    it("renders nothing whe no sets have been completed", () => {
        const testExerciseObject = { exercise: "push up", sets: [] }
        render(<ExerciseItem exercise={testExerciseObject} />);
        expect(screen.queryByText(/exercise/i)).not.toBeInTheDocument();
    });
    
    it("renders the correct number of rows for the given number of sets", () => {
        render(<ExerciseItem exercise={testExercise} />);
        const totalRows = screen.getAllByRole("row").length;
        const setRows = totalRows - 1; // As the head row is not a set row
        expect(setRows).toBe(testExercise.sets.length);
    })
});
