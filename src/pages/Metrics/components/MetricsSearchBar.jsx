import { PropTypes, func, string } from "prop-types";
import SearchBar from "../../../components/ui/SearchBar";
import SearchResults from "../../../components/ui/SearchResults";
import ExerciseName from "./ExerciseName";
import { useContext } from "react";
import { metricsContext } from "../../../context/appContext";

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
    const {
        searchInput,
        setSearchInput,
        isMostRecentOpen,
        setIsMostRecentOpen,
    } = useContext(metricsContext);

    const handleSearchBarClick = isMostRecentOpen
        ? () => setIsMostRecentOpen(false)
        : null;

    return (
        <div className="searchBarComponent">
            <SearchBar
                placeholder="search exercise"
                state={{ searchInput, setSearchInput }}
                onClick={handleSearchBarClick}
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
