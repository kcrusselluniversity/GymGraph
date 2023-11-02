import validatePassword from "./validatePassword";

export default function validateConfirmPassword(password, confirmPassword) {
    if (password === "") return "password field cannot be empty";

    if (validatePassword(password) != null) return "password not valid";

    if (password != confirmPassword) return "passwords must match";

    return null;
}
