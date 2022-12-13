import { AppBar, Button, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../features/auth/authSlice";
import { selectCurrentPage } from "../features/current/currentSlice";
import SearchIcon from '@mui/icons-material/Search';

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

const styleSearchInput = {

}

export default function TopBar() {
    const user = useAppSelector(selectUser);
    const currentPage = useAppSelector(selectCurrentPage);
    const isLoggedIn = user !== null;
    const isSearchPage = currentPage === "Search";
    let renderedSearchInput = null;
    if (isSearchPage) {
        renderedSearchInput = (
            <TextField
                variant="standard" 
                placeholder="What do you want to listen to?"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
        );
    }
    return (
        <AppBar sx={styleAppBar}>
            <Stack direction="row" paddingX={4} paddingY={2} justifyContent="space-between" alignItems="center" spacing={3}>
                {renderedSearchInput}
                <div>
                    <Button href="/signup" sx={styleButtonSignup}>
                        <Typography sx={styleTextSignup}>Sign up</Typography>
                    </Button>
                    <Button href="/login" sx={styleButtonLogin}>
                        <Typography sx={styleTextLogin}>Log in</Typography>
                    </Button>
                </div>
            </Stack>
        </AppBar>
    );
}