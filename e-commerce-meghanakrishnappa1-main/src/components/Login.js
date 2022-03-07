import { Button, TextField, Grid } from "@material-ui/core";
import { useState } from "react";
import { commerce } from "../lib/commerce";

function Login() {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [emailHelper, setEmailHelper] = useState("");

    const onEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const onEmailfieldUnfocused = (e) => {
        if (!email) {
            setEmailError(true);
            setEmailHelper("Please enter your email");
        } else {
            setEmailError(false);
            setEmailHelper("");
        }
    }

    const [isSent, setIsSent] = useState(false);
    const handleEmail = (e) => {
        if (email) {
            commerce.customer.login(email, "http://localhost:3000/user").then((response) =>
                (setIsSent(true)))
        }
    }

    if (isSent) {
        return <div>An email is sent to your email address.</div>
    }

    return (
        <div>
            <Grid container direction='column'>
                <Grid item >
                    <h2> Login</h2>
                </Grid>
                <Grid item>
                    <TextField name="email" label="Email Address " onChange={onEmailChange}
                        error={emailError}
                        helperText={emailHelper}
                        onBlur={onEmailfieldUnfocused}
                    />
                </Grid>
                <Grid item>
                    <Button size="small" onClick={handleEmail}> Request Login Token</Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default Login;