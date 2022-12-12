import { AppBar, Button, Stack, Typography } from "@mui/material";

const styleAppBar = {
    height: "64px",
    backgroundImage: "linear-gradient(#101010, #0f0f0f)",
    justifyContent: "center",
    position: "sticky",
}

const styleButtonLogin = {
    bgcolor: "white",
    borderRadius: "500px",
    "&:hover": {
        backgroundColor: "white",
        transform: "scale(1.05)"
    }
}

const styleTextLogin = { 
    color: "black", 
    textTransform: "none",
    fontWeight: "bold",
    px: 4,
    py: 1,
};

const styleButtonSignup = {
    bgcolor: "#0f0f0f",
    "&:hover": {
        backgroundColor: "#0f0f0f",
        transform: "scale(1.05)"
    }
}

const styleTextSignup = {
    color: "white",
    textTransform: "none",
    fontWeight: "bold",
}

export default function TopBar() {
    return (
        <AppBar sx={styleAppBar}>
            <Stack direction="row" paddingX={4} paddingY={2} justifyContent="flex-end" alignItems="center" spacing={3}>
                <Button href="/signup" sx={styleButtonSignup}>
                    <Typography sx={styleTextSignup}>Sign up</Typography>
                </Button>
                <Button href="/login" sx={styleButtonLogin}>
                    <Typography sx={styleTextLogin}>Log in</Typography>
                </Button>
            </Stack>
        </AppBar>
    );
}