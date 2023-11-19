const SECONDS_IN_MINUTES = 60;

/**
 * Converts a duration given in seconds into minutes and seconds
 * i.e. of the form 'M:SS'.
 * @param {number} durationInSeconds
 * @returns {string}: String representation of the duration as minutes
 * and seconds
 */
const secondsToMinutesAndSeconds = (durationInSeconds) => {
    if (durationInSeconds < 0) return;
    if (typeof durationInSeconds != "number") return;

    const minutes = Math.floor(durationInSeconds / SECONDS_IN_MINUTES);
    const seconds = String(durationInSeconds - SECONDS_IN_MINUTES * minutes);

    const formattedDuration = `${minutes}:${seconds.padStart(2, "0")}`;

    return formattedDuration;
};

export default secondsToMinutesAndSeconds;
