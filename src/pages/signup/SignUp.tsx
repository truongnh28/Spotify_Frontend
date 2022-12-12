import { Button, FormHelperText, Stack, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ReactComponent as SpotifyLogo } from "../../svg/logo.svg";

const SignUp = () => {
    return (
        <Stack spacing={2} alignItems="center">
            <Stack height="68px" width="100%" justifyContent="center" spacing={2}>
                <Stack border="solid 1px lightgray" />
            </Stack>
            <Stack alignItems="center" width="480px" spacing={2}>
                <Typography variant="h4" textAlign="center"><b>Sign up for free to start listening.</b></Typography>
                <Stack width="480px" spacing={2}>
                    <Typography><b>What's your email?</b></Typography>
                    <TextField type="email" required fullWidth placeholder="Enter your email." />
                    <Typography><b>Confirm your email</b></Typography>
                    <TextField type="email" error required fullWidth placeholder="Enter your email again." helperText="The email addresses don't match." />
                    <Typography><b>Create a password</b></Typography>
                    <TextField type="password" error required fullWidth placeholder="Create a password." helperText="You need to enter a password."/>
                    <Typography><b>What should we call you?</b></Typography>
                    <TextField required error fullWidth placeholder="Enter a profile name." helperText="Enter a name for your profile."/>
                    <Stack alignItems="center" spacing={2}>
                        <Button variant="contained" size="large">Sign up</Button>
                        <Typography>
                            Have an account?
                            <Link to="/login" >Log in</Link>
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
}

export default SignUp;