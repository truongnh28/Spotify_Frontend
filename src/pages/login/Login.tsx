import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { ReactComponent as SpotifyLogo } from "../../svg/logo.svg";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Login = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <Stack spacing={2} alignItems="center">
            <Stack height="68px" width="100%" justifyContent="center" spacing={2}>
                <Stack border="solid 1px lightgray" />
            </Stack>
            <Stack alignItems="center" width="480px" spacing={2}>
                <Typography><b>To continue, log in to Spotify</b></Typography>
                <Stack width="480px" spacing={2}>
                    <Typography><b>Email address</b></Typography>
                    <TextField type="email" required fullWidth placeholder="Email address" />
                    <Typography><b>Password</b></Typography>
                    <TextField type="password" required fullWidth placeholder="Password" />
                    <Stack alignItems="flex-end">
                        <Button variant="contained" size="large" onClick={handleOpen}>Log in</Button>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Incorrect login information
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Please check your email or password!
                                </Typography>
                            </Box>
                        </Modal>
                    </Stack>
                </Stack>
            </Stack>
            <Stack border="solid 1px lightgray" width="480px"></Stack>
            <Stack alignItems="center" width="480px" spacing={2}>
                <Typography><b>Don't have an account?</b></Typography>
                <Button href="/signup" variant="outlined" fullWidth size="large">Sign up for spotify</Button>
            </Stack>
        </Stack>
    );
}

export default Login;