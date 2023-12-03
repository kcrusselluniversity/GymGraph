import { Search } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import { func } from "prop-types";
import { useState } from "react";

/**
 * SearchBar component
 *
 * @param {function} handleSearch: This function is called with the text input
 * provided by the user.
 * @param extraProps: This is an object containing any additional props passed
 * to this component. Intented to be used to pass custom attribute values
 * for the search bars input field.
 */
const SearchBar = ({ handleSearch, ...extraProps }) => {
    const [input, setInput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (handleSearch == undefined) return;

        // Call handleSearch function 
        handleSearch(input);
    };

    return (
        <form className="searchBar" onSubmit={handleSubmit}>
            <TextField
                placeholder={extraProps?.placeholder}
                name={extraProps?.name}
                id={extraProps?.id}
                size="small"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <IconButton type="submit" aria-label="search">
                <Search />
            </IconButton>
        </form>
    );
};

SearchBar.propTypes = {
    handleSearch: func,
};

export default SearchBar;
