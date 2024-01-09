import { TableCell } from "@mui/material";
import { number } from "prop-types";

const SetData = ({ weight, reps }) => {
    return (
        <>
            <TableCell align="center">{weight} kg</TableCell>
            <TableCell align="center">{reps}</TableCell>
        </>
    );
};

SetData.propTypes = {
    weight: number,
    reps: number,
};

export default SetData;