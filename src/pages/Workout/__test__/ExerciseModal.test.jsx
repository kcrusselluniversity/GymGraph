import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ExerciseModal from "../components/ExerciseModal";
import ExerciseModalProvider from "../../../context/ExerciseModalProvider";
import { EXERCISE_GROUPS } from "../../../data/constants";
import userEvent from "@testing-library/user-event";

describe("Exercise Modal component tests", () => {
    it("renders without crashing", () => {
        render(<ExerciseModal />, { wrapper: ExerciseModalProvider });

        const firstExerciseGroup = EXERCISE_GROUPS[0];

        expect(screen.getByText(firstExerciseGroup)).toBeInTheDocument();
    });

    it("renders all exercise groups in the accordion", () => {
        render(<ExerciseModal />, { wrapper: ExerciseModalProvider });

        const ExerciseGroupQuantity = EXERCISE_GROUPS.length;

        expect(screen.queryAllByTestId("exerciseGroupPanel")).toHaveLength(
            ExerciseGroupQuantity
        );
    });

    it("initially renders with accordion panels closed", () => {
        render(<ExerciseModal />, { wrapper: ExerciseModalProvider });

        const accordionPanels = screen.getAllByTestId("exerciseGroupPanel")

        accordionPanels.forEach(panel => {
            expect(panel).toHaveAttribute("aria-expanded", "false")
        });

    });

    it("opens the selected accordion panel on click", async () => {
        const user = userEvent.setup();

        render(<ExerciseModal />, { wrapper: ExerciseModalProvider });

        const accordionPanelsButtons = screen.queryAllByRole("button");
        const firstPanelButton = accordionPanelsButtons[0];
        await user.click(firstPanelButton);

        const accordionPanels = screen.getAllByTestId("exerciseGroupPanel");
        const firstPanel = accordionPanels[0]
        const remainingPanels = accordionPanels.slice(1);
        expect(firstPanel).toHaveAttribute("aria-expanded", "true")
        remainingPanels.forEach(panel => {
            expect(panel).toHaveAttribute("aria-expanded", "false")
        })
    });

    it.only("displays the search results given user input into the search bar", async () => {
        const user = userEvent.setup();

        render(<ExerciseModal />, { wrapper: ExerciseModalProvider });

        const searchBar = screen.getByRole("textbox");
        
        await user.type(searchBar, "chest");

        expect(screen.getAllByText(/chest press/i)).not.toHaveLength(0);
    });

});
