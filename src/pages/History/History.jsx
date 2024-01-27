import SessionHistorySummary from "../../components/ui/SessionHistorySummary";
import usePaginateHistory from "./usePaginateHistory";
import Loading from "../../components/ui/Loading";
import GreyButton from "../../components/ui/GreyButton";
import "./historyPage.css";
import { useEffect } from "react";

const NO_HISTORY_MESSAGE = "You haven't completed any sessions yet";

const History = () => {
    const {
        currentHistoryResults,
        isLoading,
        isNoHistory,
        isFirstPage,
        isLastPage,
        handleNextClick,
        handlePrevClick,
        fetchNextResults,
    } = usePaginateHistory();

    // Fetch the first results on page load
    useEffect(() => {
        fetchNextResults();
    }, []);

    const historySummaryComponents = currentHistoryResults.map(
        (session, index) => (
            <SessionHistorySummary sessionObject={session} key={index} />
        )
    );

    const displayNoHistoryMessage = isNoHistory && !isLoading;

    return (
        <div className="HistoryPage userPageGrid">
            <h1 className="UserPage__title">History</h1>
            <div className="History__content">
                <div className="content__navBtns">
                    {!isFirstPage && !isLoading && (
                        <GreyButton handleClick={handlePrevClick}>
                            Prev
                        </GreyButton>
                    )}
                    {!isLastPage && !isLoading && (
                        <GreyButton handleClick={handleNextClick}>
                            Next
                        </GreyButton>
                    )}
                </div>
                {isLoading ? <Loading /> : historySummaryComponents}
                {displayNoHistoryMessage && (
                    <h2 className="HistoryPage__noHistoryMessage">
                        {NO_HISTORY_MESSAGE}
                    </h2>
                )}
            </div>
        </div>
    );
};

export default History;
