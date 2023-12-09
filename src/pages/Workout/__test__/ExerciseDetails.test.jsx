import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ExerciseModalProvider from "../../../context/ExerciseModalProvider";
import ExerciseDetails from "../components/ExerciseDetails";
import { useContext } from "react";
import { TEST_EXERCISE } from "../../../data/constants";

const { uid: TEST_EXERCISE_UID, exercise: TEST_EXERCISE_NAME } = TEST_EXERCISE;

vi.mock("react", async () => {
    const library = await vi.importActual("react");
    return {
        ...library,
        useContext: vi.fn(),
    };
});

afterEach(vi.restoreAllMocks);

describe("ExerciseDetails tests", () => {
    it("renders without crashing", () => {
        // Mock the exercise modals context
        useContext.mockReturnValue({
            searchInput: "",
            selectedExerciseInfo: TEST_EXERCISE_UID,
            setExerciseModalState: vi.fn(),
        });

        render(<ExerciseDetails />, { wrapper: ExerciseModalProvider });

        const exerciseNameHeading = screen.getByRole("heading", {
            name: TEST_EXERCISE_NAME,
        });

        expect(exerciseNameHeading).toBeInTheDocument();
    });

    it("renders the skeleton loading component when first rendered", () => {
        // Mock the exercise modals context
        useContext.mockReturnValue({
            searchInput: "",
            selectedExerciseInfo: TEST_EXERCISE_UID,
            setExerciseModalState: vi.fn(),
        });

        render(<ExerciseDetails />, { wrapper: ExerciseModalProvider });

        const skeleton_loading_component = screen.getByTestId(
            "exerciseDetailsSkeleton"
        );

        expect(skeleton_loading_component).toBeInTheDocument();
    });

    it("does not show the skeleton loading component when the gif has loaded", () => {
        // Mock the exercise modals context
        useContext.mockReturnValue({
            searchInput: "",
            selectedExerciseInfo: TEST_EXERCISE_UID,
            setExerciseModalState: vi.fn(),
        });

        render(<ExerciseDetails />, { wrapper: ExerciseModalProvider });
        const gif = screen.getByRole("img", { name: TEST_EXERCISE_NAME });

        // Simulate the image being loaded
        fireEvent.load(gif);

        const skeleton_loading_component = screen.queryByTestId(
            "exerciseDetailsSkeleton"
        );
        expect(skeleton_loading_component).not.toBeInTheDocument();
    });
});
