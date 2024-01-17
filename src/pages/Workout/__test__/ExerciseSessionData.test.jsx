import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { exerciseModalContext } from "../../../context/appContext";
import ExerciseSessionData from "../components/ExerciseSessionData";
import { node } from "prop-types";
import userEvent from "@testing-library/user-event";

// Mock exercise modal context
const mockSetExerciseModalState = vi.fn();
const mockSetIsExerciseItemSelected = vi.fn();
const mockSetIsExerciseModalOpen = vi.fn();
const mockSetExerciseAdded = vi.fn();
const mockSetSelectedExerciseInfo = vi.fn();

const exerciseName = "Bench press";
const mockContextValue = {
    exerciseAdded: { exercise: exerciseName },
    setExerciseModalState: mockSetExerciseModalState,
    searchInput: "",
    isExerciseItemSelected: false,
    setIsExerciseItemSelected: mockSetIsExerciseItemSelected,
    setIsExerciseModalOpen: mockSetIsExerciseModalOpen,
    setExerciseAdded: mockSetExerciseAdded,
    setSelectedExerciseInfo: mockSetSelectedExerciseInfo,
};

// Mock ExerciseSessionTable component
vi.mock("../components/ExerciseSessionTable", () => {
    return {
        default: function ExerciseSessionTable() {
            return <div>Exercise Session Table</div>;
        },
    };
});

// Mock React-svg
vi.mock("react-svg", () => {
    return {
        ReactSVG: vi.fn(() => <div>icon</div>),
    };
});

// Wrapper to provide context
const Wrapper = ({ children }) => (
    <exerciseModalContext.Provider value={mockContextValue}>
        {children}
    </exerciseModalContext.Provider>
);

Wrapper.propTypes = { children: node };

describe("ExerciseSessionData tests", () => {
    it("renders with the correct exercise name", () => {
        render(<ExerciseSessionData />, { wrapper: Wrapper });
        expect(screen.getByText(exerciseName)).toBeInTheDocument();
    });

    it("handles the exercise details button click correctly", async () => {
        const user = userEvent.setup();

        render(<ExerciseSessionData />, { wrapper: Wrapper });

        const exerciseDetailsBtn = screen.getByRole("button", { name: "Exercise Details"});
        await user.click(exerciseDetailsBtn);

        expect(mockSetExerciseModalState).toBeCalledTimes(1);
        expect(mockSetExerciseModalState).toBeCalledWith("selected_exercise_info");
    });
});
