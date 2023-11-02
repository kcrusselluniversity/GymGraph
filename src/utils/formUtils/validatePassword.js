export default function validatePassword(password) {
    if (password === "") return "password field cannot be empty";

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    const isValidPassword = passwordRegex.test(password);

    if (!isValidPassword)
        return "password must contain 1 numeric character, 1 captial letter and be at least 8 characters long";

    return null;
}
