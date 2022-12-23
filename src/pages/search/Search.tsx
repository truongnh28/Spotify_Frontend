import { AppBar, Box, Button, Grid, InputAdornment, Menu, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, MouseEvent, ChangeEvent, KeyboardEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUser, logout } from "../../features/auth/authSlice";
import { resetState } from "../../features/player/playerSlice";
import Nav from "../../components/Nav";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";


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

const Search = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const user = useAppSelector(selectUser);
    const [input, setInput] = useState("");
    const handleClickUser = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseUser = (wantLogout: boolean) => {
        setAnchorEl(null);
        if (wantLogout) {
            dispatch(logout());
            dispatch(resetState());
            navigate("/");
        }
    }
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const keyword = event.target.value;
        
        setInput(keyword);
    }
    const isLoggedIn = user.username.length > 0;
    const open = Boolean(anchorEl);
    const renderedSearchField = (
        <TextField
            variant="outlined"
            size="small"
            placeholder="What do you want to listen to?"
            onChange={handleInputChange}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
        />
    );
    let renderedUserButton = null;
    if (isLoggedIn) {
        renderedUserButton = (
            <div>
                <Button sx={styleButtonUser} startIcon={<AccountCircleIcon />} endIcon={<ExpandMoreIcon />} onClick={handleClickUser}>
                    {user.username}
                </Button>
                <Menu anchorEl={anchorEl} open={open} onClose={handleCloseUser}>
                    <MenuItem href={`/user/${user.code}`} onClick={() => handleCloseUser(false)}>Profile</MenuItem>
                    <MenuItem onClick={() => handleCloseUser(true)}>Logout</MenuItem>
                </Menu>
            </div>
        );
    }
    const topbar = (
        <AppBar sx={styleAppBar}>
            <Stack direction="row" paddingX={4} paddingY={2} justifyContent="space-between" alignItems="center">
                {renderedSearchField}
                {isLoggedIn ? renderedUserButton : (
                    <div>
                        <Button onClick={() => { navigate(`/signup`) }} sx={styleButtonSignup}>
                            <Typography sx={styleTextSignup}>Sign up</Typography>
                        </Button>
                        &nbsp;
                        <Button onClick={() => { navigate(`/login`) }} sx={styleButtonLogin}>
                            <Typography sx={styleTextLogin}>Log in</Typography>
                        </Button>
                    </div>
                )}
            </Stack>
        </AppBar>
    );
    return (
        <Grid direction="row" container height="100%">
            <Grid item position="fixed" width="203px" height="100%">
                <Nav currentPage="Search" />
            </Grid>
            <Grid item marginLeft="203px" height="100%" width="100%">
                {topbar}
                <Box>
                    
                </Box>
            </Grid>
        </Grid>
    );
}

export default Search;