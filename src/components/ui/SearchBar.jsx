import { TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import { PropTypes, func, string } from "prop-types";

/**
 * SearchBar component
 *
 * @param {object} state: This object contains the state value and setter function
 * for the text field inputs value.
 * @param extraProps: This is an object containing any additional props passed
 * to this component. Intented to be used to pass custom attribute values
 * for the search bars input field.
 */
const SearchBar = ({ state, ...extraProps }) => {
    const { searchInput, setSearchInput } = state;

    return (
        <TextField
            className="searchBarInput"
            placeholder={extraProps?.placeholder}
            name={extraProps?.name}
            id={extraProps?.id}
            size="small"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            InputProps={{
                endAdornment: <Search />,
            }}
        />
    );
};

SearchBar.propTypes = {
    state: PropTypes.shape({
        searchInput: string,
        setSearchInput: func,
    }),
};

export default SearchBar;
