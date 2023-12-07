import { Search } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import { func, PropTypes, string } from "prop-types";

/**
 * SearchBar component
 *
 * @param {function} handleSearch: This function is called with the text input
 * provided by the user.
 * @param {object} state: This object contains the state value and setter function
 * for the text field inputs value.
 * @param extraProps: This is an object containing any additional props passed
 * to this component. Intented to be used to pass custom attribute values
 * for the search bars input field.
 */
const SearchBar = ({ handleSearch, state, ...extraProps }) => {
    const { searchInput, setSearchInput } = state;

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(searchInput);
        if (handleSearch == undefined) return;
        // Call handleSearch function
        handleSearch(searchInput);
    };

    return (
        <form className="searchBar" onSubmit={handleSubmit}>
            <TextField
                placeholder={extraProps?.placeholder}
                name={extraProps?.name}
                id={extraProps?.id}
                size="small"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />
            <IconButton type="submit" aria-label="search">
                <Search />
            </IconButton>
        </form>
    );
};

SearchBar.propTypes = {
    handleSearch: func,
    state: PropTypes.shape({
        searchInput: string,
        setSearchInput: func,
    }),
};

export default SearchBar;
