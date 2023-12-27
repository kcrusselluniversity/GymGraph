import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useLocalStorage from "../useLocalStorage";

// Mock localStorage with an IIFE
const localStorageMock = (function () {
    let store = {};
    return {
        getItem(key) {
            if (key == "error") {
                throw new Error("getItem error");
            }
            return JSON.stringify(store[key]) || null;
        },
        setItem(key, value) {
            if (JSON.parse(value) == "setItemError") {
                throw new Error("setItem error");
            }
            store[key] = value.toString();
        },
        removeItem(key) {
            if (key == "removeError") {
                throw new Error("removeItem");
            }
            delete store[key];
        },
        clear() {
            store = {};
        },
        setInitialValue(key, value) {
            store[key] = value;
        },
    };
})();

// Override windows localStorage property
Object.defineProperty(window, "localStorage", { value: localStorageMock });

// Reset localStorageMocks's storage before each test
beforeEach(() => localStorageMock.clear());

// Restore any mocks before each test
beforeEach(vi.restoreAllMocks);

// Define a key to be used for the local storage tests
const testKey = "testKey";
const testValue = "testValue";

describe("local storage hook tests", () => {
    it("sets the state with the correct inital value", () => {
        const { result } = renderHook(() =>
            useLocalStorage(testKey, testValue)
        );
        const [, setValue] = result.current;

        act(() => setValue("newValue"));

        expect(result.current[0]).toBe("newValue");
    });

    it("sets the state with the value stored in local storage if it already exists", () => {
        // Set an initial value in local storage
        localStorageMock.setInitialValue(testKey, testValue);

        // Render the hook
        const initialValue = "differentInitialValue";
        const { result } = renderHook(() =>
            useLocalStorage(testKey, initialValue)
        );

        expect(result.current[0]).toBe(testValue);
        expect(result.current[0]).not.toBe(initialValue);
    });

    it("updates the locally stored value when the state is changed", () => {
        const { result } = renderHook(() =>
            useLocalStorage(testKey, testValue)
        );
        const [, setValue] = result.current;

        const differentValue = "differentInitialValue";
        act(() => setValue(differentValue))

        expect(localStorageMock.getItem(testKey)).toMatch(differentValue);
    });

    it("removes the key and value pair correctly", () => {
        const { result } = renderHook(() =>
            useLocalStorage(testKey, testValue)
        );
        const [, , removeValue] = result.current;

        
        act(() => removeValue());
        
        expect(result.current[0]).toEqual(testValue);
        expect(localStorageMock.getItem(testKey)).toBeNull()
    });

    it();

    it("logs an error when the local Storage setItem function errors", () => {
        // Spy on console.error
        const spy = vi.spyOn(console, "error").mockImplementation(() => {});

        const { result } = renderHook(() =>
            useLocalStorage(testKey, testValue)
        );
        const [, setValue] = result.current;

        act(() => setValue("setItemError"));

        expect(spy).toHaveBeenCalled();
    });

    it("logs an error when the local Storage getItem function errors", () => {
        // Spy on console.error
        const spy = vi.spyOn(console, "error").mockImplementation(() => {});
        renderHook(() => useLocalStorage("error", testValue));

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("logs an error when the local Storage removeItem function errors", () => {
        // Spy on console.error
        const spy = vi.spyOn(console, "error").mockImplementation(() => {});

        const { result } = renderHook(() =>
            useLocalStorage("removeError", testValue)
        );
        const [, , removeValue] = result.current;

        act(() => removeValue());

        expect(spy).toHaveBeenCalledTimes(1);
    });
});
