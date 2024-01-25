import {
    collection,
    getDocs,
    limit,
    orderBy,
    query,
    startAfter,
} from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { PAGINATION_LIMIT } from "../../data/constants";

/**
 * This function fetches the next batch of a users exercise session history
 * results after the last visible document. If there is no visible documents,
 * then this function fetches the first batch of the users session history.
 *
 * @param {object} lastVisibleDoc: Firestore Document reference object.
 * This references the last docunment visible to the user on the page.
 *
 * @returns An object with the following fields:
 * @returnField {array} historyArray: This is an array of the fetched sessions data.
 * @returnField {object} updatedFirstVisibleDoc: This is a reference to the new
 * first visible document given the most recently fetched data.
 * @returnField {object} updatedLastVisibleDoc: This is a reference to the new last
 * visible document given the most recently fetched data.
 * @returnField {boolean} lastPage: Bool value indicating if the new results
 * represent the last page of the collection.
 */
const fetchNextPageHistory = async (lastVisibleDoc) => {
    const userUid = auth.currentUser.uid;

    const exerciseHistoryRef = collection(
        db,
        `users/${userUid}/exerciseHistory`
    );

    const today = new Date();

    const historyQuery =
        lastVisibleDoc === null
            ? query(
                  exerciseHistoryRef,
                  limit(PAGINATION_LIMIT),
                  orderBy("startTime", "desc"),
                  startAfter(today)
              )
            : query(
                  exerciseHistoryRef,
                  limit(PAGINATION_LIMIT),
                  orderBy("startTime", "desc"),
                  startAfter(lastVisibleDoc)
              );

    const historySnapshot = await getDocs(historyQuery);

    const historyArray = [];
    historySnapshot.forEach((doc) => historyArray.push(doc.data()));

    // Get the first visible doc
    const updatedFirstVisibleDoc = historySnapshot.docs[0];

    // Get the last visible doc
    const numberOfDocumentsReturned = historySnapshot.docs.length;
    const lastVisibleDocIndex = numberOfDocumentsReturned - 1;
    const updatedLastVisibleDoc = historySnapshot.docs[lastVisibleDocIndex];

    // Check if the fetched results represent the last page from the collection
    const lastPage = await isLastPage(
        exerciseHistoryRef,
        updatedLastVisibleDoc
    );

    return {
        historyArray,
        updatedFirstVisibleDoc,
        updatedLastVisibleDoc,
        lastPage,
    };
};

export default fetchNextPageHistory;

/**
 * This helper function checks if there is another document in the database
 * after the most recently fetched batch.
 * @param {any} collectionRef: The collection to query.
 * @param {any} lastVisibleDocRef: The doc ref of the last document fetched
 * in the most recent batch.
 * @returns {bool} Boolean to indicate whether the most recently fetched batch
 * is the last batch of data.
 */
const isLastPage = async (collectionRef, lastVisibleDocRef) => {
    if (lastVisibleDocRef == undefined) return true;
    try {
        // Query the db to see if there exists at least 1 more result in the
        // document
        const q = query(
            collectionRef,
            limit(1),
            orderBy("startTime", "desc"),
            startAfter(lastVisibleDocRef)
        );

        const querySnapshot = await getDocs(q);
        const numberOfResultsReturned = querySnapshot.docs.length;
        const isLastPage = numberOfResultsReturned === 0;
        return isLastPage;
    } catch (err) {
        console.error("Error fetching next document", err);
        return true;
    }
};
