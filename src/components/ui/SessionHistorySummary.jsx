import ExerciseTableDisplayRow from "./ExerciseTableDisplayRow";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Table } from "@mui/material";
import { Timestamp } from "firebase/firestore";
import { object } from "prop-types";
import FormattedDate from "./FormattedDate";

/**
 * SessionHistorySummary component
 *
 * This component displays a users exercise session in a table format.
 * Specifically, it shows all exercises and each set in each exercise a user
 * completed in a given session.
 */
const SessionHistorySummary = ({ sessionObject }) => {
    // Destructure session object
    const { exercises } = sessionObject;
    let { startTime } = sessionObject;

    // Convert startTime to JS Date object if it is of type Timestamp
    if (startTime instanceof Timestamp) {
        startTime = startTime.toDate();
    }

    const sessionTableRows = [];

    // Loop over each exercise and add each set of each exercise
    // to the sessionTableRows array
    Object.values(exercises).forEach((exercise) => {
        // Destructure required data
        const { sets, name: exerciseName } = exercise;
        const setCount = sets.length || 0;

        // Create a session table row component for each set in the exercise
        sets.forEach((set, index) => {
            sessionTableRows.push(
                <ExerciseTableDisplayRow
                    key={`${exerciseName}-${index}`}
                    set={set}
                    index={index}
                    setCount={setCount}
                    exerciseName={exerciseName}
                    className={
                        index === setCount - 1 ? "ExerciseTable__lastRow" : ""
                    }
                />
            );
        });
    });

    return (
        <div className="sessionHistorySummary Card">
            <FormattedDate dateObject={startTime} />
            <Table
                aria-label="session history"
                className="sessionHistorySummary__table"
            >
                <TableHead>
                    <TableRow>
                        <TableCell>Exercise</TableCell>
                        <TableCell align="center">Weight</TableCell>
                        <TableCell align="center">Reps</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>{sessionTableRows}</TableBody>
            </Table>
        </div>
    );
};

SessionHistorySummary.propTypes = {
    sessionObject: object,
};

export default SessionHistorySummary;
