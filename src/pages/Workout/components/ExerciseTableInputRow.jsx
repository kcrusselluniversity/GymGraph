import { TableCell, TableRow } from "@mui/material";
import ControlButton from '../../../components/ui/ControlButton';

const ExerciseTableInputRow = () => {
    return (
        <TableRow>
            <TableCell align="center">
                <input className="exerciseTableInput" type="number" placeholder="kg"/>
            </TableCell>
            <TableCell align="center">
                <input className="exerciseTableInput" type="number" />
            </TableCell>
            <TableCell align="right">
                <ControlButton buttonType="add"/>
            </TableCell>
        </TableRow>
    );
};

export default ExerciseTableInputRow;
