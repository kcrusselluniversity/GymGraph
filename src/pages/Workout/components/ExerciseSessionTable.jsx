import { Table, TableContainer, Paper } from "@mui/material";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import ControlButton from "../../../components/ui/ControlButton";

const ExerciseSessionTable = () => {
    return (
        <TableContainer component={Paper}>
            <Table className="exerciseSessionTable">
                <TableHead>
                    <TableRow>
                        <TableCell align="right" size="small">Weight</TableCell>
                        <TableCell align="right" size="small">Reps</TableCell>
                        <TableCell size="small"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell size="small" align="center">20 kg</TableCell>
                        <TableCell size="small" align="center">10</TableCell>
                        <TableCell size="small" align="right" className="exerciseSessionTable__controlBtns">
                            <ControlButton buttonType="trash" label="trash"/>
                            <ControlButton buttonType="edit" label="edit"/>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center">20 kg</TableCell>
                        <TableCell align="center">10</TableCell>
                        <TableCell align="right" className="exerciseSessionTable__controlBtns">
                            <ControlButton buttonType="trash" label="trash"/>
                            <ControlButton buttonType="edit" label="edit"/>
                        </TableCell>
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
