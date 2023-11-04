import dayjs from "dayjs";

// Colour palette for the sites design.
const dominantColor = "white";
const secondaryColor = "#a8dadc";
const accentColor = "#4b86aa";

export { dominantColor, secondaryColor, accentColor };

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

const testUserObject = {
    firstName: "John",
    lastName: "Smith",
    email: "johnsmith@gmail.com",
    dob: "01012000",
    password: "Password1",
};

export { testUserObject }