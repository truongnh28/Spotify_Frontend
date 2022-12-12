import { Box, List, Stack, Typography } from "@mui/material";
import logo from "../assets/spotify-logo.png";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { FIRST_NAV, SECOND_NAV } from "../constants/UI";
import { setCurrentPage } from "../features/current/currentSlice";
import { forwardRef } from "react";

const style = {
    color: "gray",
    "&:hover": {
        cursor: "pointer",
        color: "white",
    }
};

interface LinkItemProps {
    to: string;
    name: string;
    onClick: any;
    icon: any;
    isCurrent: boolean
}

const LinkItem = (props: LinkItemProps) => {
    const { to, name, onClick, icon, isCurrent } = props;
    return (
        <Link to={to} style={{ textDecoration: "none" }} onClick={onClick}>
            <Stack direction="row" spacing={1} paddingX={3} height="40px" sx={isCurrent ? { ...style, color: "white" } : style}>
                {icon}
                <Typography><b>{name}</b></Typography>
            </Stack>
        </Link>
    );
};

const Nav = () => {
    const dispatch = useAppDispatch();
    const currentPage = useAppSelector(state => state.current.page);
    const user = useAppSelector(state => state.user.user);
    const isLoggedIn = user !== null;

    const onClickUserHandle = (page: string) => {
        dispatch(setCurrentPage(page));
    }

    const renderedFirstNav = FIRST_NAV.map(navItem => {
        const isCurrent = currentPage === navItem.name;
        const icon = isCurrent ? navItem.icon.current : navItem.icon.notCurrent;
        const changePathAndBlockEvent = (!isLoggedIn && navItem.name === "Your Library");
        let to = navItem.link;
        if (changePathAndBlockEvent) {
            to = "/login";
        }
        return (
            <li key={navItem.name}>
                <LinkItem to={to} name={navItem.name} isCurrent={isCurrent} icon={icon} onClick={changePathAndBlockEvent ? undefined : (() => onClickUserHandle(navItem.name))} />
            </li>
        )
    });
    const renderedSecondNav = SECOND_NAV.map(navItem => {
        const isCurrent = currentPage === navItem.name;
        let to = navItem.link;
        if (!isLoggedIn) {
            to = "/login";
        }
        return (
            <li key={navItem.name}>
                <LinkItem to={to} name={navItem.name} isCurrent={isCurrent} icon={navItem.icon} onClick={!isLoggedIn ? undefined : (() => onClickUserHandle(navItem.name))} />
            </li>
        );
    })
    return (
        <Stack height="100%" bgcolor="black">
            <Stack paddingTop={3} height="100%" justifyContent="space-between">
                <Box>
                    <Box paddingX={3} marginBottom={2}>
                        <Link to="/">
                            <img src={logo} alt="logo" width={131} height={40} />
                        </Link>
                    </Box>
                    <List disablePadding>
                        {renderedFirstNav}
                    </List>
                    <List disablePadding sx={{ mt: 3 }}>
                        {renderedSecondNav}
                    </List>
                </Box>
            </Stack>
        </Stack>
    );
}

export default Nav;