import { describe, it, expect } from "vitest";
import { SessionExercises, Exercise, Set } from "../SessionExercises";

describe("SessionExercises class tests", () => {
    it("constructs an object with a private exercises property whose value is an empty object", () => {
        const sessionExercises = new SessionExercises();
        expect(Object.keys(sessionExercises)).toContain("_exercises");
        expect(sessionExercises._exercises).toEqual(expect.any(Object));
    });
    
    it("adds an exercise to the sessionExercises object", () => {
        const exercise = new Exercise("1234", "squat", "legs");
        const sessionExercises = new SessionExercises();
        const updatedSessionExercises = sessionExercises.addExercise(exercise);
    })
});
