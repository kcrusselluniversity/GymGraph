import { useState, useEffect } from "react";

/**
 * useLocalStorage hook
 * 
 * This hook wraps around a useState hook in order to store a state value
 * in local storage and keep the locally stored value in sync with the state. 
 * 
 * The motivation for this was to persist data between refreshes for the 
 * application to be more versitile, as well as to be used for storing 
 * locally a users Exercise data during a training session.
 * This is more desirable than making a network request with every change 
 * (and thus improving fluidity and user experience). 
 * 
 * When the session is complete then all the data is saved to 
 * the backend database in one single request. 
 * 
 * @param {string} key: The key to store the value in local storage
 * @param {any} initialValue: The initial value to store
 * 
 * @returns {array}: The array given by [value, setValue, removeValue]
 */
const useLocalStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => {
        try {
            // Initialise state with stored local storage value
            // (if it already exists)
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (err) {
            console.error(err);
            return initialValue;
        }
    });

    // Update local storage when value changes
    useEffect(() => {
        try {
            value == null
                ? window.localStorage.removeItem(key)
                : window.localStorage.setItem(key, JSON.stringify(value));
        } catch (err) {
            console.error(err);
        }
    }, [key, value]);

    // Function to remove the value from local storage
    const removeValue = () => {
        try {
            setValue(null);
        } catch (err) {
            console.error(err);
        }
    };

    return [value, setValue, removeValue];
};

export default useLocalStorage;
