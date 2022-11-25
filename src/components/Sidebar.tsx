import { Box, Link, Stack, Typography } from "@mui/material";
import { useState } from "react";
import Logo from "./Logo";
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import SearchIcon from '@mui/icons-material/Search';

export default function SideBar() {
    const [currentState, setCurrentState] = useState([
        {
            icon: HomeIcon,
            flippedIcon: HomeOutlinedIcon,
            title: "Home",
            selected: true
        },
        {
            icon: SearchIcon,
            flippedIcon: SearchOffIcon,
            title: "Search",
            selected: false,
        }
    ]);

    function handleClick(title: string) {
        console.log("change");
        setCurrentState((prevState) => {
            const newState = [...prevState];
            newState.map(item => {
                item.title === title ? item.selected = true : item.selected = false;
                return item;
            });
            return newState;
        });
    }

    const menus = currentState.map((menu) => {
        const Component = menu.selected ? menu.icon : menu.flippedIcon;
        return (
            <Link
                href="#"
                key={menu.title}
                underline="none"
                onClick={() => handleClick(menu.title)}
                color="white"
            >
                <Stack
                    paddingX={2}
                    height="50px"
                    direction="row"
                    spacing={2}
                    alignItems="center"
                >
                    <Component fontSize="large" />
                    <Typography
                        variant="h6"
                        color={menu.selected ? "#fff" : "rgba(255, 255, 255, 0.7)"}
                    >
                        {menu.title}
                    </Typography>
                </Stack>
            </Link>
        );
    })

    return (
        <Box width="233px" position="fixed" marginTop={3}>
            <Logo />
            <Box>
                {menus}
            </Box>
        </Box>
    );
}