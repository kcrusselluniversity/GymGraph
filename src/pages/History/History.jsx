import SessionHistorySummary from "../../components/ui/SessionHistorySummary";
import usePaginateHistory from "./usePaginateHistory";
import Loading from "../../components/ui/Loading";
import GreyButton from "../../components/ui/GreyButton";
import "./historyPage.css";

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
            </div>
        </>
    );
};

export default History;
