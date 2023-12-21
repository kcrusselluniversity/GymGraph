const INVALID_SET_MESSAGE = "Invalid set: Object is not an instance of Set";
const INVALID_EXERCISE_MESSAGE =
    "Invalid exercise: Object is not an instance of Exercise";

/**
 * SessionExercises class
 *
 * This class creates a session exercise object.
 * This object contains a private property called _exercises which is an
 * object that stores the exercises the user has added to their session.
 *
 * The class has methods to add an exercise, as well as adding, removing and
 * updating a set in an added exercise.
 *
 * All methods in this class return a new instance of the object, instead of
 * directly mutating the existing object. This design was chosen as this class
 * is used as State in the exercise modal context and as such a new object
 * must be passed to the state setter for it to correctly update the state.
 */

class SessionExercises {
    constructor(parsedLocalStorage) {
        if (parsedLocalStorage === undefined) {
            this._exercises = {};
            return;
        }

        // Rehydrate the plain object received by the constructor
        // We must do this because the JSON stored in local storage representing
        // the session exercises object does not store the class methods, nor
        // does it store the data as their respective class objects such as Set
        // and Exercise.
        // Thus we must take the plain JS object, then convert it into a new
        // object with the methods rehydrated.
        const parsedLocalStorageRehydrated = {};

        // We want to loop over each key (which is an exercise) then convert
        // that into an exercise object and add it to the rehydrated local storage.
        // To do so we must take the sets property and rehydrate them as well.
        Object.keys(parsedLocalStorage._exercises).forEach((exerciseUid) => {
            // Get the exercise associated with the uid
            const plainExerciseObject =
                parsedLocalStorage._exercises[exerciseUid];

            const { uid, name, muscleGroup, startTime, sets } =
                plainExerciseObject;

            // Convert the sets array into an array of Set objects
            const rehydratedSets = sets.map(
                (set) => new Set(set.weight, set.reps)
            );

            // Create the exercise object
            const rehydratedExercise = new Exercise(
                uid,
                name,
                muscleGroup,
                startTime,
                rehydratedSets
            );

            // Add exercise to rehydrated local storage object
            parsedLocalStorageRehydrated[uid] = rehydratedExercise;
        });

        this._exercises = parsedLocalStorageRehydrated;
    }

    addExercise(exercise) {
        if (!(exercise instanceof Exercise)) {
            throw new Error(INVALID_EXERCISE_MESSAGE);
        }

        // Make a copy of the current object
        const updatedSessionExercises = this.clone();

        // Add the exercise to the object
        const exerciseUid = exercise.uid;
        updatedSessionExercises._exercises[exerciseUid] = exercise;

        return updatedSessionExercises;
    }

    addSetToExercise(exerciseUid, set) {
        // Make a copy of the current object
        const updatedSessionExercises = this.clone();

        const exercise = updatedSessionExercises._exercises[exerciseUid];
        if (exercise === null) {
            throw new Error("Invalid exerciseUid provided to method");
        }

        if (!(set instanceof Set)) {
            throw new Error("Invalid set provided to method");
        }

        exercise.addSet(set);
        return updatedSessionExercises;
    }

    removeSetFromExercise(exerciseUid, setIndex) {
        // Make a copy of the current object
        const updatedSessionExercises = this.clone();

        const exercise = updatedSessionExercises._exercises[exerciseUid];

        if (exercise === undefined) {
            throw new Error("Invalid exerciseUid provided to method");
        }

        exercise.removeSet(setIndex);

        if (exercise.sets.length === 0) {
            // Remove exercise from session
            delete updatedSessionExercises._exercises[exerciseUid];
        }

        return updatedSessionExercises;
    }

    updateSetFromExercise(exerciseUid, setIndex, updatedSet) {
        // Make a copy of the current object
        const updatedSessionExercises = this.clone();

        const exercise = updatedSessionExercises.getExercises()[exerciseUid];

        // Validate parameter values
        if (exercise === undefined) {
            throw new Error("Invalid exerciseUid provided to method");
        }

        if (setIndex < 0 || setIndex >= exercise.sets.length) {
            throw new Error("Invalid setIndex provided to method");
        }

        if (!(updatedSet instanceof Set)) {
            throw new Error("Invalid updatedSet value provided to method");
        }

        // Update set
        updatedSessionExercises._exercises[exerciseUid].sets[setIndex] =
            updatedSet;

        return updatedSessionExercises;
    }

    getExercises() {
        return this._exercises;
    }

    clone() {
        // Create a copy of the current session exercise object
        const updatedSessionExercises = new SessionExercises();
        Object.assign(updatedSessionExercises._exercises, this._exercises);

        return updatedSessionExercises;
    }
}

/**
 * Exercise class
 *
 * This class creates an Exercise object. This object contains an exercises
 * name, unique identifier (uid), the muscle group associated with the
 * exercise, the start time of this exercise in a given session, and
 * an array to contain the sets performed of this exercise in this session.
 */
class Exercise {
    constructor(uid, name, muscleGroup, startTime, sets) {
        this.uid = uid;
        this.name = name;
        this.muscleGroup = muscleGroup;
        this.startTime = startTime || new Date();
        this.sets = sets || [];
    }

    addSet(set) {
        if (!(set instanceof Set)) {
            throw new Error(INVALID_SET_MESSAGE);
        }

        this.sets.push(set);
    }

    removeSet(index) {
        if (index < 0 || index >= this.sets.length) {
            throw new Error("Invalid index provided");
        }

        this.sets.splice(index, 1);
    }
}

/**
 * Set class
 *
 * This class returns a set object which contains a weight and reps property.
 */
class Set {
    constructor(weight, reps) {
        this.weight = weight;
        this.reps = reps;
    }
}

export { SessionExercises, Exercise, Set };
