import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import useLocalStorage from "../useLocalStorage";

// Mock localStorage with an IIFE
const localStorageMock = (function () {
    let store = {};
    return {
        getItem(key) {
            if (key == "error") {
                throw new Error("getItem error");
            }
            return store[key] || null;
        },
        setItem(key, value) {
            if (JSON.parse(value) == "setItemError") {
                throw new Error("setItem error");
            }
            store[key] = value.toString();
        },
        removeItem(key) {
            if (key == "error") {
                throw new Error("removeItem");
            }
            delete store[key];
        },
        clear() {
            store = {};
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
const key = "testKey";

describe("local storage hook tests", () => {
    it("sets the key with the correct value", () => {
        const { result } = renderHook(() => useLocalStorage(key));
        result.current.setItem("testValue");

        expect(result.current.getItem()).toEqual("testValue");
    });

    it("serializes the value before setting the key", () => {
        // Spy on JSON.stringify
        const spy = vi.spyOn(JSON, "stringify");

        const { result } = renderHook(() => useLocalStorage(key));
        result.current.setItem("testValue");

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("logs an error when the local Storage setItem function errors", () => {
        // Spy on console.error
        const spy = vi.spyOn(console, "error").mockImplementation(() => {});

        const { result } = renderHook(() => useLocalStorage(key));
        result.current.setItem("setItemError");

        expect(spy).toHaveBeenCalled();
    });

    it("parses the item before returning it from local storage", () => {
        const { result } = renderHook(() => useLocalStorage(key));
        result.current.setItem("testValue");

        // Spy on JSON.parse
        const spy = vi.spyOn(JSON, "parse");

        result.current.getItem();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("returns undefined if no item is stored in localStorage", () => {
        const { result } = renderHook(() => useLocalStorage(key));

        const item = result.current.getItem();
        expect(item).toBeUndefined();
    });

    it("logs an error when the local Storage getItem function errors", () => {
        // Spy on console.error
        const spy = vi.spyOn(console, "error").mockImplementation(() => {});
        const { result } = renderHook(() => useLocalStorage("error"));

        result.current.getItem();

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("removes the key and value pair correctly", () => {
        const { result } = renderHook(() => useLocalStorage(key));
        result.current.setItem("testValue");

        result.current.removeItem();

        expect(result.current.getItem()).toBeUndefined();
    });

    it("logs an error when the local Storage removeItem function errors", () => {
        // Spy on console.error
        const spy = vi.spyOn(console, "error").mockImplementation(() => {});
        const { result } = renderHook(() => useLocalStorage("error"));

        result.current.removeItem();

        expect(spy).toHaveBeenCalledTimes(1);
    });
});
