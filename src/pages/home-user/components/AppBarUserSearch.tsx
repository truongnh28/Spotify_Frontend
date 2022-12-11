import { AccountCircle } from "@mui/icons-material";
import { AppBar, IconButton, Input, InputAdornment, Menu, MenuItem, Stack, TextField, Toolbar, Typography } from "@mui/material";
import React from "react";
import SearchIcon from '@mui/icons-material/Search';


export default function AppBarUserSearch() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <AppBar sx={{
            py: 1,
            pr: 2,
            backgroundImage: "linear-gradient(#101010, #0f0f0f)",
            position: "sticky",
        }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <TextField InputProps={{
                    startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>
                }}
                />
                <Toolbar>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle/>
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </Stack>
        </AppBar>
    );
}