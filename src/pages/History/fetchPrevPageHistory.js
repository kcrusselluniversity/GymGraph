import {
    collection,
    query,
    endBefore,
    getDocs,
    limitToLast,
    orderBy,
} from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { PAGINATION_LIMIT } from "../../data/constants";

/**
 * This function fetches the previous batch of a users exercise session history
 * results before the first visible document on the page.
 *
 * @param {object} firstVisibleDoc: Firestore Document reference object.
 * This references the first visible document on the page, prior to the fetch
 * request.
 *
 * @returns An object with the following fields:
 * @returnField {array} historyArray: This is an array of the fetched sessions data
 * @returnField {object} updatedFirstVisibleDoc: This is a reference to the new
 * first visible document given the most recently fetched data.
 * @returnField {object} updatedLastVisibleDoc: This is a reference to the new last
 * visible document given the most recently fetched data.
 */
const fetchPrevPageHistory = async (firstVisibleDoc) => {
    const userUid = auth.currentUser.uid;

    const exerciseHistoryRef = collection(
        db,
        `users/${userUid}/exerciseHistory`
    );

    const historyQuery = query(
        exerciseHistoryRef,
        limitToLast(PAGINATION_LIMIT),
        orderBy("startTime", "desc"),
        endBefore(firstVisibleDoc)
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

    return {
        historyArray,
        updatedFirstVisibleDoc,
        updatedLastVisibleDoc,
    };
};

export default fetchPrevPageHistory;
