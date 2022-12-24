import { AppBar, Box, Button, Grid, InputAdornment, Menu, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, MouseEvent, ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUser, logout } from "../../features/auth/authSlice";
import { resetState } from "../../features/player/playerSlice";
import Nav from "../../components/Nav";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import { search } from "../../services/search";
import { SongExpandResponse } from "../../models/SongResponse";
import { ArtistResponse } from "../../models/ArtistResponse";
import { PlaylistExpandResponse } from "../../models/PlaylistResponse";
import { AlbumExpandResponse } from "../../models/AlbumResponse";


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

const styleImgCard = {
    width: "100%",
    aspectRatio: "1 / 1",
}

const styleCard = {
    textTransform: "none",
    bgcolor: "#181818",
    color: "#b3b3b3",
    "&:hover": {
        bgcolor: "hsla(0, 0%, 100%, .1)",
        textDecoration: "none",
    }
}

export const Card = ({ id, imgSrc, title, description, link }: { id: number, imgSrc: string, title: string, description: string; link: string }) => {
    const navigate = useNavigate();
    const handleClickCard = () => {
        navigate(`${link}/${id}`);
    }
    return (
        <Button sx={styleCard} variant="contained" fullWidth onClick={handleClickCard}>
            <div style={{ textAlign: "left" }}>
                <div>
                    <img src={imgSrc} alt="" style={styleImgCard} />
                </div>
                <b style={{ color: "white" }}>{title}</b>
                <div className="clamp">{description}</div>
            </div>
        </Button>
    );
}

const Search = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const user = useAppSelector(selectUser);
    const [input, setInput] = useState("");
    const [songs, setSongs] = useState([] as SongExpandResponse[]);
    const [artists, setArtists] = useState([] as ArtistResponse[]);
    const [playlists, setPlaylists] = useState([] as PlaylistExpandResponse[]);
    const [albums, setAlbums] = useState([] as AlbumExpandResponse[]);
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
        if (keyword.length > 0) {
            search(keyword).then((res: (SongExpandResponse[] | AlbumExpandResponse[] | ArtistResponse[] | PlaylistExpandResponse[])[]) => {
                setSongs(res[0] as SongExpandResponse[]);
                setAlbums(res[1] as AlbumExpandResponse[]);
                setArtists(res[2] as ArtistResponse[]);
                setPlaylists(res[3] as PlaylistExpandResponse[]);
            })
        }
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
    const renderedTopbar = (
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
    const renderedContent = (
        <>
            {
                playlists.length > 0 ?
                    <>
                        <Grid sx={{ pb: 2 }} container justifyContent="space-between" alignItems="center" spacing={{ sm: 2, md: 3, lg: 3, xl: 3 }}>
                            <Grid item>
                                <Typography fontSize="1.5rem">Playlists</Typography>
                            </Grid>
                            <Grid item>
                                <Typography fontSize="0.75rem">SHOW ALL</Typography>
                            </Grid>
                        </Grid>
                        <Grid sx={{ pb: 2 }} container columns={{ xs: 3, sm: 3, md: 4, lg: 5, xl: 9 }} spacing={{ sm: 2, md: 3, lg: 3, xl: 3 }}>
                            {playlists.map((playlist: PlaylistExpandResponse) => (
                                <Grid item key={playlist.play_list_id} xs={1} sm={1} md={1} lg={1} xl={1}>
                                    <Card id={playlist.play_list_id} imgSrc={playlist.cover_img} title={playlist.name} description={""} link="/playlist" />
                                </Grid>
                            ))}
                        </Grid>
                    </>
                : undefined
            }
            {
                albums.length > 0 ?
                    <>
                        <Grid sx={{ pb: 2 }} container justifyContent="space-between" alignItems="center" spacing={{ sm: 2, md: 3, lg: 3, xl: 3 }}>
                            <Grid item>
                                <Typography fontSize="1.5rem">Albums</Typography>
                            </Grid>
                            <Grid item>
                                <Typography fontSize="0.75rem">SHOW ALL</Typography>
                            </Grid>
                        </Grid>
                        <Grid sx={{ pb: 2 }} container columns={{ xs: 3, sm: 3, md: 4, lg: 5, xl: 9 }} spacing={{ sm: 2, md: 3, lg: 3, xl: 3 }}>
                            {albums.map((album: AlbumExpandResponse) => (
                                <Grid item key={album.album_id} xs={1} sm={1} md={1} lg={1} xl={1}>
                                    <Card id={album.album_id} imgSrc={album.cover_img} title={album.name} description={album.artist_name as string} link="/album" />
                                </Grid>
                            ))}
                        </Grid>
                    </>
                    : undefined
            }
            {
                artists.length > 0 ?
                    <>
                        <Grid sx={{ pb: 2 }} container justifyContent="space-between" alignItems="center" spacing={{ sm: 2, md: 3, lg: 3, xl: 3 }}>
                            <Grid item>
                                <Typography fontSize="1.5rem">Artists</Typography>
                            </Grid>
                            <Grid item>
                                <Typography fontSize="0.75rem">SHOW ALL</Typography>
                            </Grid>
                        </Grid>
                        <Grid sx={{ pb: 2 }} container columns={{ xs: 3, sm: 3, md: 4, lg: 5, xl: 9 }} spacing={{ sm: 2, md: 3, lg: 3, xl: 3 }}>
                            {artists.map((artirst: ArtistResponse) => (
                                <Grid item key={artirst.artist_id} xs={1} sm={1} md={1} lg={1} xl={1}>
                                    <Card id={artirst.artist_id} imgSrc={artirst.coverImg} title={artirst.name} description={"Artist"} link="/artist" />
                                </Grid>
                            ))}
                        </Grid>
                    </>
                    : undefined
            }
        </>
    );
    return (
        <Grid direction="row" container height="100%">
            <Grid item position="fixed" width="203px" height="100%">
                <Nav currentPage="Search" />
            </Grid>
            <Grid item marginLeft="203px" height="100%" width="100%">
                {renderedTopbar}
                <Box sx={{ px: 4, pt: 3 }}>
                    {renderedContent}
                </Box>
                <Box height="120px" width="100%" />
            </Grid>
        </Grid>
    );
}

export default Search;