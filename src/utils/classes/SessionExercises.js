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

        // Add the exercise to the object
        const exerciseUid = exercise.uid;
        this._exercises[exerciseUid] = exercise;

        return this.clone();
    }

    addSetToExercise(exerciseUid, set) {
        const exercise = this._exercises[exerciseUid];
        exercise.addSet(set);

        return this.clone();
    }

    removeSetFromExercise(exerciseUid, setIndex) {
        const exercise = this._exercises[exerciseUid];
        exercise.removeSet(setIndex);

        return this.clone();
    }

    // TODO: updateSetFromExercise(exerciseUid, setIndex, updatedSet) {}

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
