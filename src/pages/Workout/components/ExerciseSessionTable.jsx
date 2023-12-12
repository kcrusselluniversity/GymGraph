import { Table, TableContainer, Paper } from "@mui/material";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import ExerciseTableDataRow from "./ExerciseTableDataRow";
import ExerciseTableInputRow from "./ExerciseTableInputRow";

/**
 * Exercise Session Table
 * 
 * Once the user has selected an exercise (eg bench press) this table is used
 * to add the weight, reps and sets for this user during their workout session. 
 */
const ExerciseSessionTable = () => {
    return (
        <TableContainer component={Paper}>
            <Table className="exerciseSessionTable">
                <ExerciseTableHead />
                <TableBody>
                    <ExerciseTableDataRow weight={20} reps={12} />
                    <ExerciseTableDataRow weight={20} reps={10} />
                    <ExerciseTableInputRow />
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const ExerciseTableHead = () => {
    return (
        <TableHead>
            <TableRow>
                <TableCell align="center" size="small">
                    Weight
                </TableCell>
                <TableCell align="center" size="small">
                    Reps
                </TableCell>
                <TableCell size="small"></TableCell>
            </TableRow>
        </TableHead>
    );
};


export default ExerciseSessionTable;
