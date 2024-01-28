import { useEffect } from "react";

/**
 * Scroll to top on load
 * 
 * This component can be added to a page to scroll to the top on load
 */

const ScrollToTopOnLoad = () => {
    // Scroll to top of page when component loads
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return null; // Component does not return anything
};

export default ScrollToTopOnLoad;
