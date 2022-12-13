import { AppBar, Button, InputAdornment, Menu, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout, selectUser } from "../features/auth/authSlice";
import { selectCurrentPage, setCurrentPage } from "../features/current/currentSlice";
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from "react";
import { useNavigate } from "react-router-dom";

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
        bgcolor: "#0f0f0f",
        transform: "scale(1.05)"
    }
}

const styleTextSignup = {
    color: "white",
    textTransform: "none",
    fontWeight: "bold",
}

const styleButtonUser = {
    bgcolor: "black",
    color: "white",
    borderRadius: "500px",
    "&:hover": {
        bgcolor: "black",
    }
}

export default function TopBar() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClickUser = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseUser = (wantLogout: boolean) => {
        setAnchorEl(null);
        if (wantLogout) {
            dispatch(logout());
            navigate("/");
            dispatch(setCurrentPage("Home"));
        }
    }
    const user = useAppSelector(selectUser);
    const currentPage = useAppSelector(selectCurrentPage);
    const isLoggedIn = user.account.username !== null && user.account.code !== null;
    const isSearchPage = currentPage === "Search";
    let renderedSearchInput = null;
    if (isSearchPage) {
        renderedSearchInput = (
            <TextField
                variant="outlined"
                size="small"
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
    let renderedUserButton = null;
    if (isLoggedIn) {
        renderedUserButton = (
            <div>
                <Button sx={styleButtonUser} startIcon={<AccountCircleIcon />} endIcon={<ExpandMoreIcon />} onClick={handleClickUser}>
                    NhatThanh
                </Button>
                <Menu anchorEl={anchorEl} open={open} onClose={handleCloseUser}>
                    <MenuItem href={`/user/${user.account.code}`} onClick={() => handleCloseUser(false)}>Profile</MenuItem>
                    <MenuItem onClick={() => handleCloseUser(true)}>Logout</MenuItem>
                </Menu>
            </div>
        );
    }
    let justifyContent = "flex-end";
    if (isSearchPage) {
        justifyContent = "space-between";
    }

    return (
        <AppBar sx={styleAppBar}>
            <Stack direction="row" paddingX={4} paddingY={2} justifyContent={justifyContent} alignItems="center">
                {renderedSearchInput}
                {isLoggedIn ? renderedUserButton : (
                    <div>
                        <Button href="/signup" sx={styleButtonSignup}>
                            <Typography sx={styleTextSignup}>Sign up</Typography>
                        </Button>
                        &nbsp;
                        <Button href="/login" sx={styleButtonLogin}>
                            <Typography sx={styleTextLogin}>Log in</Typography>
                        </Button>
                    </div>
                )}
            </Stack>
        </AppBar>
    );
}