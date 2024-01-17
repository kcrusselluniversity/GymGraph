import { useState } from "react";
import "./metrics.css";
import MetricsSearchBar from "./components/MetricsSearchBar";
import MostRecentExercises from "./components/MostRecentExercises";

const Metrics = () => {
    const [searchInput, setSearchInput] = useState("");
    const [isMostRecentOpen, setIsMostRecentOpen] = useState(false);

    return (
        <div className="metricsPage userPageGrid">
            <div className="metrics__header">
                <MetricsSearchBar
                    inputState={{ searchInput, setSearchInput, isMostRecentOpen, setIsMostRecentOpen }}
                />
                <MostRecentExercises state={{ setSearchInput, isMostRecentOpen, setIsMostRecentOpen }} />
            </div>
            <div className="metrics__content"></div>
        </div>
    );
};

export default Metrics;
