import { useState } from "react";
import SearchBar from "../../components/ui/SearchBar";
import SearchResults from "../../components/ui/SearchResults";
import ExerciseName from "./components/ExerciseName";
import "./metrics.css";

const Metrics = () => {
    const [searchInput, setSearchInput] = useState("");
    return (
        <div className="metricsPage userPageGrid">
            <div className="metrics__header">
                <div className="searchBarComponent">
                    <SearchBar placeholder="search exercise" state={{ searchInput, setSearchInput }} />
                    <div className="searchResultsContainer">
                        <SearchResults input={searchInput} RenderComponent={ExerciseName}/>
                    </div>
                </div>
            </div>
            <div className="metrics__content"></div>
        </div>
    );
};

export default Metrics;
