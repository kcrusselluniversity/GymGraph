import { useEffect, useState } from "react";
import fetchNextPageHistory from "./fetchNextPageHistory";
import fetchPrevPageHistory from "./fetchPrevPageHistory";

/**
 * usePaginateHistory custom hook
 *
 * This hook is used to paginate the users history results so only the results
 * the user can see on the screen are fetched, resulting in a smaller network
 * bundle data request.
 */
const usePaginateHistory = () => {
    const [currentHistoryResults, setCurrentHistoryResults] = useState([]);
    const [lastVisibleDoc, setLastVisibleDoc] = useState(null);
    const [firstVisibleDoc, setFirstVisibleDoc] = useState(null);
    const [isFirstPage, setIsFirstPage] = useState(true);
    const [isLastPage, setIsLastPage] = useState(false);
    const [startOfCollectionDoc, setStartOfCollectionDoc] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isNoHistory, setIsNoHistory] = useState(true);

    const fetchNextResults = async () => {
        const {
            historyArray,
            updatedFirstVisibleDoc,
            updatedLastVisibleDoc,
            lastPage,
        } = await fetchNextPageHistory(lastVisibleDoc);

        // Check if 'startOfCollectionDoc' is null, indicating this is our
        // first retrieval from the collection.
        // If it is, set 'startOfCollectionDoc' to 'updatedFirstVisibleDoc'
        // to mark the first document of the collection.
        if (startOfCollectionDoc === null) {
            setStartOfCollectionDoc(updatedFirstVisibleDoc);
        }

        // Update state
        setCurrentHistoryResults(historyArray);
        setFirstVisibleDoc(updatedFirstVisibleDoc);
        setLastVisibleDoc(updatedLastVisibleDoc);
        setIsLastPage(lastPage);
        setIsLoading(false);
        setIsNoHistory(historyArray.length === 0)
    };

    const fetchPrevResults = async () => {
        const { historyArray, updatedFirstVisibleDoc, updatedLastVisibleDoc } =
            await fetchPrevPageHistory(firstVisibleDoc);

        // Check if the fetched results are to top results from the collection,
        // if so it is the first page so we update the state accordingly
        if (isSameDoc(startOfCollectionDoc, updatedFirstVisibleDoc)) {
            setIsFirstPage(true);
        }

        // Update isLastPage if fetching previous results when you are on
        // the last page
        if (isLastPage) setIsLastPage(false);

        // Update state
        setCurrentHistoryResults(historyArray);
        setFirstVisibleDoc(updatedFirstVisibleDoc);
        setLastVisibleDoc(updatedLastVisibleDoc);
        setIsLoading(false);
    };

    // This function fetches the next batch of user history data
    const handleNextClick = async () => {
        setIsLoading(true);
        setIsFirstPage(false);
        await fetchNextResults();
    };

    // This function fetches the previous batch of user history data
    const handlePrevClick = async () => {
        await fetchPrevResults();
    };

    // Fetch the first result on page load
    useEffect(() => fetchNextResults, []);

    return {
        currentHistoryResults,
        isLoading,
        isNoHistory,
        isFirstPage,
        isLastPage,
        handleNextClick,
        handlePrevClick,
    };
};

export default usePaginateHistory;

/**
 * Helper function to determine if two document references refer to the same
 * document.
 */
const isSameDoc = (doc1, doc2) => {
    return doc1.id === doc2.id;
};
