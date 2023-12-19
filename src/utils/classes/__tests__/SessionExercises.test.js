import { describe, it, expect } from "vitest";
import { SessionExercises, Exercise, Set } from "../SessionExercises";

describe("SessionExercises class tests", () => {
    it("constructs an object with a private exercises property whose value is an empty object", () => {
        const sessionExercises = new SessionExercises();
        expect(Object.keys(sessionExercises)).toContain("_exercises");
        expect(sessionExercises._exercises).toEqual(expect.any(Object));
    });

    describe("addExercise method tests", () => {
        it("adds an exercise to the sessionExercises object", () => {
            const exercise = new Exercise("1234", "squat", "legs");
            const sessionExercises = new SessionExercises();
            const updatedSessionExercises =
                sessionExercises.addExercise(exercise);
            expect(
                updatedSessionExercises.getExercises()[exercise.uid]
            ).toEqual(exercise);
        });

        it("returns a new object (not a reference to the same object) when an exercise is added", () => {
            const exercise = new Exercise("1234", "squat", "legs");
            const sessionExercises = new SessionExercises();
            const updatedSessionExercises =
                sessionExercises.addExercise(exercise);
            expect(updatedSessionExercises).not.toBe(sessionExercises);
        });

        it("throws an error if the value passed to the addExercise method is not an Exercise object", () => {
            const nonExerciseObject = {};
            const sessionExercises = new SessionExercises();
            expect(() =>
                sessionExercises.addExercise(nonExerciseObject)
            ).toThrowError();
        });
    });

    describe("addSetToExercise method tests", () => {
        it("adds a valid set to an exercise in the exercise session", () => {
            let updatedSessionExercises = null;

            const sessionExercises = new SessionExercises();
            const exerciseUid = "1234";
            const exercise = new Exercise(exerciseUid, "squat", "legs");
            const set = new Set(20, 20);

            updatedSessionExercises = sessionExercises.addExercise(exercise);
            updatedSessionExercises = updatedSessionExercises.addSetToExercise(
                exerciseUid,
                set
            );
            const addedSetFromSessionExercises =
                updatedSessionExercises.getExercises()[exerciseUid].sets[0];

            expect(addedSetFromSessionExercises).toEqual(set);
        });

        it("throws an error if the set is being added to an exercise not in the session", () => {
            const sessionExercises = new SessionExercises();
            const exerciseUid = "1234";
            const set = new Set(20, 20);

            expect(() =>
                sessionExercises.addSetToExercise(exerciseUid, set)
            ).toThrowError();
        });

        it("throws an error if the value provided to the set parameter is an invalid object", () => {
            const sessionExercises = new SessionExercises();
            const exerciseUid = "1234";
            const set = {};

            expect(() =>
                sessionExercises.addSetToExercise(exerciseUid, set)
            ).toThrowError();
        });

        it("returns a new object (not a reference to the same object) when a set is added to an exercise in the session", () => {
            let updatedSessionExercises = null;

            const sessionExercises = new SessionExercises();
            const exerciseUid = "1234";
            const exercise = new Exercise(exerciseUid, "squat", "legs");
            const set = new Set(20, 20);

            updatedSessionExercises = sessionExercises.addExercise(exercise);
            updatedSessionExercises = updatedSessionExercises.addSetToExercise(
                exerciseUid,
                set
            );

            expect(updatedSessionExercises).not.toBe(sessionExercises);
        });
    });

    describe("removeSetFromExercise method tests", () => {
        it("removes a valid set from the exercise", () => {
            // Set up
            let updatedSessionExercises = null;
            const sessionExercises = new SessionExercises();
            const exerciseUid = "1234";
            const exercise = new Exercise(exerciseUid, "squat", "legs");
            const set = new Set(20, 20);
            updatedSessionExercises = sessionExercises.addExercise(exercise);
            updatedSessionExercises = updatedSessionExercises.addSetToExercise(
                exerciseUid,
                set
            );

            // Remove set from exercise
            updatedSessionExercises =
                updatedSessionExercises.removeSetFromExercise(exerciseUid, 0);

            expect(
                updatedSessionExercises.getExercises()[exerciseUid].sets
            ).toHaveLength(0);
        });

        it("throws an error if an invalid exercise uid is provided as a value to the method", () => {
            // Set up
            let updatedSessionExercises = null;
            const sessionExercises = new SessionExercises();
            const exerciseUid = "1234";
            const exercise = new Exercise(exerciseUid, "squat", "legs");
            const set = new Set(20, 20);
            updatedSessionExercises = sessionExercises.addExercise(exercise);
            updatedSessionExercises = updatedSessionExercises.addSetToExercise(
                exerciseUid,
                set
            );

            // Remove set from exercise
            const invalidExerciseUid = "0";

            expect(() =>
                updatedSessionExercises.removeSetFromExercise(
                    invalidExerciseUid,
                    0
                )
            ).toThrowError();
        });

        it("throws an error if an invalid index is provided as a value to the method", () => {
            // Set up
            let updatedSessionExercises = null;
            const sessionExercises = new SessionExercises();
            const exerciseUid = "1234";
            const exercise = new Exercise(exerciseUid, "squat", "legs");
            const set = new Set(20, 20);
            updatedSessionExercises = sessionExercises.addExercise(exercise);
            updatedSessionExercises = updatedSessionExercises.addSetToExercise(
                exerciseUid,
                set
            );

            // Remove set from exercise
            const invalidIndex = 10;

            expect(() =>
                updatedSessionExercises.removeSetFromExercise(
                    exerciseUid,
                    invalidIndex
                )
            ).toThrowError();
        });
    });

    describe("updateSetFromExercise method tests", () => {
        it("correctly updates a set", () => {
            // Set up
            let updatedSessionExercises = null;
            const sessionExercises = new SessionExercises();
            const exerciseUid = "1234";
            const exercise = new Exercise(exerciseUid, "squat", "legs");
            const set = new Set(20, 20);

            updatedSessionExercises = sessionExercises.addExercise(exercise);
            updatedSessionExercises = updatedSessionExercises.addSetToExercise(
                exerciseUid,
                set
            );

            const updatedSet = new Set(10, 10);
            updatedSessionExercises =
                updatedSessionExercises.updateSetFromExercise(
                    exerciseUid,
                    0,
                    updatedSet
                );

            expect(
                updatedSessionExercises.getExercises()[exerciseUid].sets[0]
            ).toEqual(updatedSet);
        });

        it("throws an error if provided an invalid exerciseUid", () => {
            // Set up
            const sessionExercises = new SessionExercises();
            const invalidExerciseUid = "1234";
            const set = new Set(20, 20);

            expect(() =>
                sessionExercises.addSetToExercise(invalidExerciseUid, set)
            ).toThrowError();
        });

        it("throws an error if provided an invalid setIndex", () => {
            // Set up
            let updatedSessionExercises = null;
            const sessionExercises = new SessionExercises();
            const exerciseUid = "1234";
            const exercise = new Exercise(exerciseUid, "squat", "legs");
            const set = new Set(20, 20);
            updatedSessionExercises = sessionExercises.addExercise(exercise);
            updatedSessionExercises = updatedSessionExercises.addSetToExercise(
                exerciseUid,
                set
            );

            const invalidSetIndex = 10;
            const updatedSet = new Set(10, 10);

            expect(() =>
                updatedSessionExercises.updateSetFromExercise(
                    exerciseUid,
                    invalidSetIndex,
                    updatedSet
                )
            ).toThrowError();
        });

        it("throws an error if provided an invalid updatedSet", () => {
            // Set up
            let updatedSessionExercises = null;
            const sessionExercises = new SessionExercises();
            const exerciseUid = "1234";
            const set = new Set(20, 20);
            const exercise = new Exercise(exerciseUid, "squat", "legs");
            updatedSessionExercises = sessionExercises.addExercise(exercise);
            updatedSessionExercises = updatedSessionExercises.addSetToExercise(
                exerciseUid,
                set
            );

            const validSetIndex = 0;
            const invalidSet = {};

            expect(() =>
                updatedSessionExercises.updateSetFromExercise(
                    exerciseUid,
                    validSetIndex,
                    invalidSet
                )
            ).toThrowError();
        });
    });
});
