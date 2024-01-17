import { PropTypes, func, string } from "prop-types";
import SearchBar from "../../../components/ui/SearchBar";
import SearchResults from "../../../components/ui/SearchResults";
import ExerciseName from "./ExerciseName";
import { useContext, useRef } from "react";
import { metricsContext } from "../../../context/appContext";
import useOutsideClick from "../../../hooks/useOutsideClick";

/**
 * Metrics search bar component
 *
 * MetricsSearchBar is a React functional component that provides a user
 * interface for searching and displaying search results related to exercises.
 *
 * This component integrates a SearchBar and SearchResults components to enable
 * users to input search queries and view the results dynamically.
 */
const MetricsSearchBar = () => {
    // Destructure required context
    const { searchInput, setSearchInput } = useContext(metricsContext);

    // Set up ref
    const ref = useRef(null);

    // Callback function for outside click event listener
    const handleOutsideClick = () => {
        setSearchInput("");
    };
    // Call custom hook to add event listener for clicks outside the component
    useOutsideClick(ref, handleOutsideClick);

    return (
        <div className="searchBarComponent" ref={ref}>
            <SearchBar
                placeholder="search exercise"
                state={{ searchInput, setSearchInput }}
            />
            <div className="resultsContainer searchResultsContainer">
                <SearchResults
                    input={searchInput}
                    RenderComponent={ExerciseName}
                />
            </div>
        </div>
    );
};

MetricsSearchBar.propTypes = {
    inputState: PropTypes.shape({
        searchInput: string,
        setSearchInput: func,
    }),
};

export default MetricsSearchBar;
