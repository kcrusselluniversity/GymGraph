import dayjs from "dayjs";

// List of exercise muscle groups
export const EXERCISE_GROUPS = [
    "abs",
    "arms",
    "back",
    "chest",
    "legs",
    "shoulders",
];

// Colour palette for the sites design
const DOMINANT_COLOR = "white";
const SECONDARY_COLOR = "#a8dadc";
const ACCENT_COLOR = "#4b86aa";
const FONT_COLOR_LITE = "#232323";
const PINK_COLOR = "#C070FF99";
const PINK_COLOR_LITE = "#C070FF55";
const GREY_COLOR = "#555";
const GREY_COLOR_LITE = "#55555555";
const GREY_COLOR_ULTRA_LITE = "#55555502";

export {
    DOMINANT_COLOR,
    SECONDARY_COLOR,
    ACCENT_COLOR,
    FONT_COLOR_LITE,
    GREY_COLOR_ULTRA_LITE,
};

// NavBar display settings
const DISPLAY_SMALL_SCREEN = "950px";
const DISPLAY_MOBILE_SCREEN = "500px";

export { DISPLAY_SMALL_SCREEN, DISPLAY_MOBILE_SCREEN };

// CircularProgressbar constants
const INNER_TO_OUTER_CIRCLE_RATIO = 0.8;
const CIRCULAR_PROGRESSBAR_SVG_RADIUS = 45;
const CIRCULAR_PROGRESSBAR_CIRCUM =
    2 * Math.PI * CIRCULAR_PROGRESSBAR_SVG_RADIUS;

export { CIRCULAR_PROGRESSBAR_CIRCUM, INNER_TO_OUTER_CIRCLE_RATIO };

// RestTimer constants
export const TIME_ADJUSTMENT_IN_SECONDS = 15;
export const MAX_REST_TIMER_DURATION_IN_SECONDS = 599;
export const INITIAL_REST_TIME = 180;

// Exercise API constants
export const GIF_SIZE_STANDARD = 360;

// NOTE: This API endpoint is self hosted by me, thus is hardcoded
export const EXERCISE_GIF_URL_ENDPOINT =
    "https://gymgraph-gifs.web.app/exercises";


// Firebase calls constants
export const PAGINATION_LIMIT = 2;

// This constant holds the style used to modify the MUI Button component
// for all 'Call To Action' buttons such as a Link button to another page,
// or a 'Log in' button.
const CTA_BUTTON_STYLE = {
    bgcolor: ACCENT_COLOR,
    fontFamily: "Montserrat",
    textTransform: "none",
    fontSize: "16px",
    fontWeight: "600",
    my: "8px",
    px: "1.75rem",
    py: "4px",
};

export { CTA_BUTTON_STYLE };

const SECONDARY_BUTTON_STYLE = {
    ...CTA_BUTTON_STYLE,
    bgcolor: SECONDARY_COLOR,
    color: FONT_COLOR_LITE,
};

const PINK_CTA_BUTTON_STYLE = {
    ...CTA_BUTTON_STYLE,
    color: FONT_COLOR_LITE,
    bgcolor: PINK_COLOR,
    fontWeight: "500",

    // Hover styles
    "&:hover": {
        color: "white !important",
        bgcolor: PINK_COLOR_LITE,
    },
};

const GREY_STYLE_BUTTON = {
    ...CTA_BUTTON_STYLE,
    color: "white",
    bgcolor: GREY_COLOR,
    fontWeight: "500",

    // Hover styles
    "&:hover": {
        color: "white !important",
        bgcolor: GREY_COLOR_LITE,
    },
};

const BUTTON_BORDER_STYLE = {
    border: "1px solid black",
    borderRadius: "1rem",
    padding: "0px",
    height: "fit-content",
};

export {
    SECONDARY_BUTTON_STYLE,
    PINK_CTA_BUTTON_STYLE,
    GREY_STYLE_BUTTON,
    BUTTON_BORDER_STYLE,
};

// DateTime constants
const MIN_DATE = dayjs().set("year", 1900).set("month", 0).set("date", 1);
const MAX_DATE = dayjs().set("year", 2020).set("month", 0).set("date", 1);
const YEAR_MONTH_DAY_FORMAT = "YYYY-MM-DD";

export { MIN_DATE, MAX_DATE, YEAR_MONTH_DAY_FORMAT };

// Recharts constants
export const DEFAULT_MAX_AXIS_VALUE = 100;
export const GRAPH_DAY_RANGE = 6;
export const PIE_CHART_COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A633FF",
];
export const RADIAN = Math.PI / 180;
export const LABEL_RADIUS_SCALING_FACTOR = 0.6;

// METRICS PAGE CONSTANTS
export const NUM_EXERCISES_TO_DISPLAY = 5;

// Gif Component Constants
export const SKELETON_SCALING_FACTOR = 1.01;

// TESTING CONSTANTS
// This is used for testing a user in RTL tests.
// It specifically represents what information a user would input into
// the sign up form.
const TEST_USER_UID = 12345;
const TEST_USER_OBJECT = {
    firstName: "John",
    lastName: "Smith",
    email: "johnsmith@gmail.com",
    dob: "01012000",
    password: "Password1",
    confirmPassword: "Password1",
};

export { TEST_USER_UID, TEST_USER_OBJECT };

// These objects are used for testing routes
// This object represents the Auth when a user has not yet signed in
const DEFAULT_AUTH_CONTEXT = {
    user: "",
    isLoading: false,
};

// This object represents the Auth when a user is signed in
const USER_AUTH_CONTEXT = {
    user: "John",
    isLoading: false,
};

export { DEFAULT_AUTH_CONTEXT, USER_AUTH_CONTEXT };

// This is used for Testing exercises on the workout page
export const TEST_EXERCISE = {
    uid: "23001301",
    muscleGroup: "back",
    exercise: "Inverted Row Bent Knees",
};

export const TEST_EXERCISE_2 = {
    uid: "05481301",
    muscleGroup: "back",
    exercise: "Kettlebell Sumo High Pull",
};

export const TEST_EXERCISE_3 = {
    uid: "14311301",
    muscleGroup: "back",
    exercise: "Lever Assisted Standing Chin Up",
};

export const TEST_EXERCISE_4 = {
    uid: "02381301",
    muscleGroup: "back",
    exercise: "Cable Straight Arm Pulldown",
};

export const TEST_EXERCISE_5 = {
    uid: "06701301",
    muscleGroup: "back",
    exercise: "Rear Pull up",
};

// The Exercise UID is the key for the session exercises list, and each keys
// value is an object with the exercise object and a sets array as the
// properties.
export const TEST_EXERCISE_LIST = {
    23001301: {
        exerciseObject: TEST_EXERCISE,
        startTime: new Date(2023, 11, 1, 10, 0, 0),
        sets: [
            { weight: 20, reps: 10 },
            { weight: 20, reps: 8 },
            { weight: 20, reps: 6 },
        ],
    },
    "05481301": {
        exerciseObject: TEST_EXERCISE_2,
        startTime: new Date(2023, 11, 1, 10, 10, 0),
        sets: [
            { weight: 20, reps: 10 },
            { weight: 20, reps: 8 },
            { weight: 20, reps: 6 },
        ],
    },
    14311301: {
        exerciseObject: TEST_EXERCISE_3,
        startTime: new Date(2023, 11, 1, 10, 20, 0),
        sets: [
            { weight: 20, reps: 10 },
            { weight: 20, reps: 8 },
            { weight: 20, reps: 6 },
        ],
    },
    "02381301": {
        exerciseObject: TEST_EXERCISE_4,
        startTime: new Date(2023, 11, 1, 10, 30, 0),
        sets: [
            { weight: 20, reps: 10 },
            { weight: 20, reps: 8 },
            { weight: 20, reps: 6 },
        ],
    },
    "06701301": {
        exerciseObject: TEST_EXERCISE_5,
        startTime: new Date(2023, 11, 1, 10, 40, 0),
        sets: [
            { weight: 20, reps: 10 },
            { weight: 20, reps: 8 },
            { weight: 20, reps: 6 },
        ],
    },
};

export const TEST_SESSION_OBJECT =  {
    "exercises": {
        "13681301": {
            "uid": "13681301",
            "startTime": "2024-01-09T02:39:50.111Z",
            "muscleGroup": "legs",
            "sets": [
                {
                    "weight": 10,
                    "reps": 10
                },
                {
                    "weight": 10,
                    "reps": 10
                },
                {
                    "weight": 10,
                    "reps": 10
                }
            ],
            "name": "Ankle Circles"
        },
        "09781301": {
            "uid": "09781301",
            "muscleGroup": "shoulders",
            "name": "Band front raise",
            "sets": [
                {
                    "weight": 10,
                    "reps": 10
                },
                {
                    "weight": 10,
                    "reps": 10
                },
                {
                    "weight": 10,
                    "reps": 10
                }
            ],
            "startTime": "2024-01-09T02:39:57.431Z"
        },
        // "00111301": {
        //     "muscleGroup": "abs",
        //     "sets": [
        //         {
        //             "weight": 10,
        //             "reps": 10
        //         },
        //         {
        //             "weight": 10,
        //             "reps": 10
        //         },
        //         {
        //             "weight": 10,
        //             "reps": 10
        //         }
        //     ],
        //     "uid": "00111301",
        //     "startTime": "2024-01-09T02:39:42.553Z",
        //     "name": "Assisted Hanging Knee Raise"
        // }
    },
    "startTime": "2024-01-09T02:39:36.977Z"
}