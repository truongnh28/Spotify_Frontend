import { Box, List, Stack, Typography } from "@mui/material";
import logo from "../assets/Spotify_logo.png";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface LinkItemProps {
    icon?: React.ReactElement;
    primary: string;
    to: string;
    current?: boolean;
}

const style = {
    color: "gray",
    "&:hover": {
        cursor: "pointer",
        color: "white",
    }
};

const LinkItem = (props: LinkItemProps) => {
    const { icon, primary, to, current } = props;
    return (
        <li>    
            <Link to={to} style={{textDecoration: "none"}}>
                <Stack direction="row" spacing={1} paddingX={3} height="40px" sx={current ? {...style, color: "white"}: style}>
                    {icon}
                    <Typography><b>{primary}</b></Typography>
                </Stack>
            </Link>
        </li>
    )
}

const Nav = () => {
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
                        <LinkItem icon={<HomeIcon />} to="/" primary="Home" current />
                        <LinkItem icon={<SearchOffIcon />} to="/search" primary="Search"/>
                        <LinkItem icon={<LibraryMusicOutlinedIcon />} to="#" primary="Your Library"/>
                    </List>
                    <List disablePadding sx={{mt: 3}}>
                        <LinkItem icon={<AddBoxIcon />} to="#" primary="Create Playlist" />
                        <LinkItem icon={<FavoriteIcon />} to="#" primary="Liked Songs"/>
                    </List>
                </Box>
            </Stack>
        </Stack>
    );
}

export default Nav;