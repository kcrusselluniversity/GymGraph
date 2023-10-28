import LinkButton from "../../components/ui/LinkButton";
import { TextField } from "@mui/material";
import { useState } from "react";

const SignInForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {};

    return <form
                        className="signInEmail"
                        onSubmit={handleSubmit}
                        noValidate
                    >
                        <TextField
                            variant="outlined"
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <TextField
                            variant="outlined"
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <LinkButton to="" text="Log In" />
                    </form>
}

export default SignInForm;