import SessionHistorySummary from "../../components/ui/SessionHistorySummary";
import usePaginateHistory from "./usePaginateHistory";
import Loading from "../../components/ui/Loading";
import "./historyPage.css";
import { Button } from "@mui/material";

const History = () => {
    const {
        currentHistoryResults,
        isLoading,
        isFirstPage,
        isLastPage,
        handleNextClick,
        handlePrevClick,
    } = usePaginateHistory();

    const historySummaryComponents = currentHistoryResults.map(
        (session, index) => (
            <SessionHistorySummary sessionObject={session} key={index} />
        )
    );

    return (
        <>
            <h1>History</h1>
            <div className="History__content">
                {(!isLastPage && !isLoading) && <Button onClick={handleNextClick}>Next</Button>}
                {(!isFirstPage && !isLoading) && (
                    <Button onClick={handlePrevClick}>Prev</Button>
                )}
                {isLoading ? <Loading /> : historySummaryComponents}
            </div>
        </>
    );
};

export default History;
