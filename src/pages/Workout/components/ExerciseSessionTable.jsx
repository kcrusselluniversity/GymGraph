import { Table, TableContainer, Paper } from "@mui/material";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const ExerciseSessionTable = () => {
    return (
        <TableContainer component={Paper}>
            <Table className="exerciseSessionTable">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Weight</TableCell>
                        <TableCell align="left">Reps</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>20 kg</TableCell>
                        <TableCell>10</TableCell>
                        <TableCell>Btn</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>20 kg</TableCell>
                        <TableCell>8</TableCell>
                        <TableCell>Btn</TableCell>
                    </TableRow>
                    {/* <TableRow>
                        <TableCell><input type="number" /></TableCell>
                        <TableCell><input type="number" /></TableCell>
                        <TableCell>Btn</TableCell>
                    </TableRow> */}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ExerciseSessionTable;
