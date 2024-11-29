function validation(values) {
    let errors = {};

    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

    // Validate name
    if (!values.name || values.name.trim() === "") {
        errors.name = "Name should not be empty";
    }

    // Validate email
    if (!values.email || values.email.trim() === "") {
        errors.email = "Email should not be empty";
    } else if (!email_pattern.test(values.email)) {
        errors.email = "Invalid email format";
    }

    // Validate password
    if (!values.password || values.password.trim() === "") {
        errors.password = "Password should not be empty";
    } else if (!password_pattern.test(values.password)) {
        errors.password = "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, and a number";
    }

    return errors;
}

export default validation;