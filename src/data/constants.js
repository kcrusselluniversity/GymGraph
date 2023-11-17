import dayjs from "dayjs";

// Colour palette for the sites design.
const dominantColor = "white";
const secondaryColor = "#a8dadc";
const accentColor = "#4b86aa";

export { dominantColor, secondaryColor, accentColor };

// NavBar display settings
const NavBarDisplaySmallScreen = "950px";
const NavBarDisplayMobileScreen = "500px";

export { NavBarDisplaySmallScreen, NavBarDisplayMobileScreen };

// CircularProgressbar constants
const innerToOuterCircleRatio = 0.8;
const circularProgressbarSVGRadius = 45;
const circularProgressbarCircum = 2 * Math.PI * circularProgressbarSVGRadius;

export { circularProgressbarCircum, innerToOuterCircleRatio };

// This constant holds the style used to modify the MUI Button component
// for all 'Call To Action' buttons such as a Link button to another page,
// or a 'Log in' button.
const CTAButtonStyle = {
    bgcolor: accentColor,
    fontFamily: "Montserrat",
    textTransform: "none",
    fontSize: "16px",
    fontWeight: "600",
    my: "8px",
    px: "1.75rem",
    py: "4px",
};

export { CTAButtonStyle };

// DateTime constants
const minDate = dayjs().set("year", 1900).set("month", 0).set("date", 1);
const maxDate = dayjs().set("year", 2020).set("month", 0).set("date", 1);

export { minDate, maxDate };

// This is used for testing a user in RTL tests.
// It specifically represents what information a user would input into
// the sign up form.
const testUserObject = {
    firstName: "John",
    lastName: "Smith",
    email: "johnsmith@gmail.com",
    dob: "01012000",
    password: "Password1",
    confirmPassword: "Password1",
};

export { testUserObject };

// These objects are used for testing routes
// This object represents the Auth when a user has not yet signed in
const defaultAuthContext = {
    user: "",
    isLoading: false,
};

// This object represents the Auth when a user is signed in
const userAuthContext = {
    user: "John",
    isLoading: false,
};

export { defaultAuthContext, userAuthContext };
