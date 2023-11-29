import { useState, useEffect } from "react";

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
