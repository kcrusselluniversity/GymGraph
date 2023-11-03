import validateName from "../../../utils/formUtils/validateName";
import validateEmail from "../../../utils/formUtils/validateEmail";
import validatePassword from "../../../utils/formUtils/validatePassword";

// This object maps the input fields name attribute to the appropreate
// validation function for that field
export const validateFunctionMap = {
    firstName: validateName,
    lastName: validateName,
    email: validateEmail,
    password: validatePassword,
};