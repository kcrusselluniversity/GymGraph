import { useEffect } from "react";

/**
 * Use outside click custom hook
 *
 * useOutsideClick is a custom React hook designed to detect and respond to
 * mouse clicks outside of a specified DOM element. This hook is useful for
 * implementing UI behaviors such as closing a modal, dropdown, or any floating
 * UI element when a user clicks outside of it.
 *
 * @param {React.RefObject} ref: A ref object pointing to a DOM element.
 * This is the element for which the hook will detect outside clicks.
 * @param {function} callback: A function that will be called whenever a click
 * is detected outside the ref element.
 */
function useOutsideClick(ref, callback) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, callback]);
}

export default useOutsideClick;
