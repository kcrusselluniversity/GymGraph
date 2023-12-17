/**
 * Session
 * @param {string} sessionId: The sessions UID
 * @param {Date} startTime: The start time of the session
 * @returns {object}
 */
class Session {
    constructor(sessionId, startTime) {
        this.sessionId = sessionId;
        this.startTime = startTime;
        this.sessionExercises = {};
    }

    addSessionExercises(sessionExercises) {
        this.sessionExercises = sessionExercises;
    }
}

export default Session;
