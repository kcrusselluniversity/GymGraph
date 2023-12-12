import { TableCell, TableRow } from "@mui/material";
import ControlButton from '../../../components/ui/ControlButton';

/**
 * Exercise Table Input Row component
 * 
 * This component is used as the input row of the exercise table component. 
 * It allows the user to input the weight and reps for their set of the 
 * current exercise. 
 */
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
