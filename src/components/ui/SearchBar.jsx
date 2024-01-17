import { TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import { PropTypes, func, string } from "prop-types";

/**
 * SearchBar component
 *
 * UI component for inputting a search query.
 * @param {string} placeholder: The placeholder text for the input field.
 * @param {object} state: The state to control the input.
 */
const SearchBar = ({ placeholder, state, onClick }) => {
    const { searchInput, setSearchInput } = state;

    return (
        <TextField
            className="searchBarInput"
            placeholder={placeholder}
            size="small"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onClick={onClick ? () => onClick() : undefined}
            InputProps={{
                endAdornment: <Search />,
            }}
        />
    );
};

SearchBar.propTypes = {
    placeholder: string,
    state: PropTypes.shape({
        searchInput: string,
        setSearchInput: func,
    }),
    onClick: func,
};

export default SearchBar;
