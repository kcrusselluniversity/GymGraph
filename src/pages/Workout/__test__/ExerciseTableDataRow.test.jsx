import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ExerciseTableDataRow from "../components/ExerciseTableDataRow";
import { node } from "prop-types";
import userEvent from "@testing-library/user-event";

// Write required mocks
const mockHandleRowDelete = vi.fn();
const mockProps = {
    weight: "10",
    reps: "5",
    index: 1,
    handleRowDelete: mockHandleRowDelete,
};

// Mock ExerciseTableEditRow as its tested separately
vi.mock("../components/ExerciseTableEditRow", () => {
    return {
        default: function ExerciseTableEditRow() {
            return (
                <tr>
                    <td></td>
                    <td></td>
                </tr>
            );
        },
    };
});

// Mock the reactSVG component as it appears to make network requests
// under the hood which is not desired in our unit tests
vi.mock("react-svg", () => {
    return {
        ReactSVG: vi.fn(() => <div>icon</div>),
    };
});

// Write wrapper to render table correctly
const Wrapper = ({ children }) => {
    return (
        <table>
            <tbody>{children}</tbody>
        </table>
    );
};
Wrapper.propTypes = { children: node };

describe("ExerciseTableDataRow tests", () => {
    it("renders without crashing", () => {
        render(<ExerciseTableDataRow {...mockProps} />, { wrapper: Wrapper });
        expect(screen.getByText("10 kg")).toBeInTheDocument();
        expect(screen.getByText("5")).toBeInTheDocument();
    });

    it("displays weight and reps in non-edit mode", () => {
        render(<ExerciseTableDataRow {...mockProps} />, { wrapper: Wrapper });
        expect(screen.getByText("10 kg")).toBeInTheDocument();
        expect(screen.getByText("5")).toBeInTheDocument();
        expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    });

    it("toggles to edit mode when edit button is clicked", async () => {
        const user = userEvent.setup();
        render(<ExerciseTableDataRow {...mockProps} />, { wrapper: Wrapper });
        const editButton = screen.getByLabelText("edit");
        await user.click(editButton);
        expect(screen.queryByText("10 kg")).not.toBeInTheDocument();
        expect(screen.queryByText("5")).not.toBeInTheDocument();
    });

    it("calls handleRowDelete when delete button is clicked", async () => {
        const user = userEvent.setup();
        render(<ExerciseTableDataRow {...mockProps} />, { wrapper: Wrapper });
        const deleteButton = screen.getByLabelText("trash");
        await user.click(deleteButton);
        expect(mockHandleRowDelete).toHaveBeenCalled();
    });
});
