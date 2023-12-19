const INVALID_SET_MESSAGE = "Invalid set: Object is not an instance of Set";
const INVALID_EXERCISE_MESSAGE =
    "Invalid exercise: Object is not an instance of Exercise";

class SessionExercises {
    constructor() {
        this._exercises = {};
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
        return this.clone();
    }

    removeSetFromExercise(exerciseUid, setIndex) {
        // Make a copy of the current object
        const updatedSessionExercises = this.clone();

        const exercise = updatedSessionExercises._exercises[exerciseUid];

        if (exercise === undefined) {
            throw new Error("Invalid exerciseUid provided to method");
        }

        exercise.removeSet(setIndex);

        return this.clone();
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

class Exercise {
    constructor(uid, name, muscleGroup) {
        this.uid = uid;
        this.name = name;
        this.muscleGroup = muscleGroup;
        this.startTime = new Date();
        this.sets = [];
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

class Set {
    constructor(weight, reps) {
        this.weight = weight;
        this.reps = reps;
    }
}

export { SessionExercises, Exercise, Set };
