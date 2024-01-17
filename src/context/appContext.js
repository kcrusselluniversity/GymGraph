import { createContext } from "react";

// Create context for user authentication
export const AuthContext = createContext(null);

// Create context for the dashboard pages state
export const dashboardContext = createContext(null);

// Create context for the exercise modals state
export const exerciseModalContext = createContext(null);

// Create context for users history state
export const historyContext = createContext(null);

// Create context for rest timer
export const RestTimerContext = createContext(null);

// Create context for the metrics page
export const metricsContext = createContext(null);
