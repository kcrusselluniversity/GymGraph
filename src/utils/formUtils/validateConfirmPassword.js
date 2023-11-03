export default function validateConfirmPassword(password, confirmPassword) {
    if (password != confirmPassword) return "passwords must match";

    return null;
}
