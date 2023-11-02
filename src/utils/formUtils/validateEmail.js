export default function validateEmail(email) {
    // This Regex matches emails that have a top-level and (optionally)
    // a secondary top-level domain.
    // Example matches:
    // username@domain.com
    // username@domain.co.uk
    // username@domain.com.au
    const emailRegex =
        /^[a-zA-Z0-9._-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\.[a-zA-Z]{2,6})?$/;

    const validEmail = emailRegex.test(email);
    if (!validEmail) return "Must be a valid email address";

    return null;
}
