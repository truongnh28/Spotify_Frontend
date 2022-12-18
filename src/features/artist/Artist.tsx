import { Grid, Box, Stack, Typography, IconButton, TableContainer, Table, TableBody, TableFooter, Button, Paper, TableCell, TableRow } from "@mui/material";
import { useParams } from "react-router-dom";
import Nav from "../../components/Nav";
import MusicPlayer from "../../components/MusicPlayer";
import TopBar from "../../components/TopBar";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PauseIcon from '@mui/icons-material/Pause';
import { useEffect, useState } from "react";
import { SongExpandResponse } from "../../models/SongResponse";
import { getSongsByArtist } from "../../services/songs";
import { ArtistResponse } from "../../models/ArtistResponse";
import { getSingleArtist } from "../../services/artists";
import Avatar from "@mui/material/Avatar";
import { convertToMinuteAndSecond } from "../../utils/convert";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { checkLikedSong, unlikeSong, likedSong } from "../../services/interactions";
import { selectUser } from "../auth/authSlice";
import { selectCurrentSong, selectPlaying, setCurrentSong, setSongList, togglePlaying } from "../player/playerSlice";

const LikeButton = ({ song_id }: { song_id: number }) => {
    const user = useAppSelector(selectUser);
    const [liked, setLiked] = useState(false);
    useEffect(() => {
        checkLikedSong(user.user_id, song_id).then((res) => {
            setLiked(res);
        })
    }, [song_id, user.user_id]);
    const handleLikedButton = (prev: boolean, song_id: number) => {
        if (prev) {
            unlikeSong(user.user_id, song_id).then((res) => {
                setLiked(false);
            });
        } else {
            likedSong(user.user_id, song_id).then((res) => {
                setLiked(true);
            })
        }
    }
    return (
        <Typography>
            <IconButton onClick={() => handleLikedButton(liked, song_id)}>
                {liked ? <FavoriteIcon color="success" /> : <FavoriteBorderIcon />}
            </IconButton>
        </Typography>
    )
}

const About = ({ artist }: { artist: ArtistResponse }) => {
    return (
        <Paper elevation={1}>
            <Stack direction="row" padding={5} alignItems="center" spacing={4}>
                <Avatar src={artist.coverImg} alt="" sx={{ height: "100%", width: "204px" }} />
                <Typography color="#b3b3b3" fontSize="1rem">{artist.description}</Typography>
            </Stack>
        </Paper>
    );
}

const styleRow = {
    "&:hover": {
        bgcolor: "hsla(0,0%,100%,.1)",
    }
}

const Artist = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const [artist, setArtist] = useState(null);
    const [songs, setSongs] = useState([] as SongExpandResponse[]);
    const playing = useAppSelector(selectPlaying);
    const currentSong = useAppSelector(selectCurrentSong);
    useEffect(() => {
        getSingleArtist(Number(id)).then((res) => {
            setArtist(res.data.artists[0]);
        })
        getSongsByArtist(Number(id)).then((res) => {
            setSongs(res.data.songs);
            dispatch(setSongList(res.data.songs));
        })
    }, [id, dispatch]);
    const handlePlayButton = (index: number) => {
        if (currentSong === index) {
            dispatch(togglePlaying(playing));
        } else {
            if (playing === true) {
                dispatch(setCurrentSong(index));
            } else {
                dispatch(togglePlaying(playing));
                dispatch(setCurrentSong(index));
            }
        }
    }
    const renderedSongs = songs.map((song: SongExpandResponse, index) => {
        const { song_id, name, length } = song;        
        const time = convertToMinuteAndSecond(length);
        return (
            <TableRow key={song_id} sx={styleRow}>
                <TableCell sx={{paddingX: 0}}>
                    <IconButton onClick={() => handlePlayButton(index)}>
                        {(currentSong === index && playing) ? <PauseIcon /> : <PlayArrowIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>
                    <Typography fontSize="1rem" color={(currentSong === index && playing) ? "green" : "white"}>{name}</Typography>
                </TableCell>
                <TableCell>
                    <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={3}>
                        <LikeButton song_id={song_id} />
                        <Typography>{time}</Typography>
                    </Stack>
                </TableCell>
            </TableRow>
        );
    });
    let renderedArtist = null;
    if (artist) {
        renderedArtist = artist as ArtistResponse;
    }
    let contentRendered = <Typography>Not found specific artist</Typography>
    if (artist && renderedArtist) {
        contentRendered = (
            <>
                <Stack paddingX={4} paddingBottom={3}>
                    <Stack direction="row">
                        <Box marginRight={3} height={{ xs: "192px", sm: "192px", md: "192px", lg: "232px", xl: "232px" }} >
                            <Avatar src={renderedArtist.coverImg} alt="" sx={{ height: "100%", width: "auto" }} />
                        </Box>
                        <Stack direction="column" justifyContent="flex-end" lineHeight="25.6px" spacing={1}>
                            <Typography color="white" fontSize={{ xs: "2rem", sm: "2rem", md: "4.5rem", lg: "6rem", xl: "6rem" }} fontWeight="bold">{renderedArtist.name}</Typography>
                        </Stack>
                    </Stack>
                </Stack>
                <Box>
                    <Box height="104px">
                        <Stack paddingX={4} paddingY={3} direction="row" justifyContent="flex-start" spacing={4} alignItems="center">
                            <IconButton color="success" style={{ height: "56px", width: "56px" }}>
                                <PlayCircleIcon style={{ height: "56px", width: "56px" }} />
                            </IconButton>
                            <Button variant="outlined" color="inherit" style={{ height: "32px" }}>
                                Follow
                            </Button>
                        </Stack>
                    </Box>
                    <Box>
                        <Box paddingX={4}>
                            <TableContainer>
                                <Table>
                                    <TableBody>
                                        {renderedSongs}
                                    </TableBody>
                                    <TableFooter>
                                        <Box height="90px" />
                                    </TableFooter>
                                </Table>
                            </TableContainer>
                            <Typography fontSize="1.5rem">About</Typography>
                            <About artist={renderedArtist} />
                            <Box height="180px" />
                        </Box>
                    </Box>
                </Box>
            </>
        );
    }
    return (
        <Grid direction="row" container height="100%">
            <Grid position="fixed" width="203px" height="100%">
                <Nav currentPage="" />
            </Grid>
            <Grid marginLeft="203px" height="100%" width="100%">
                <TopBar currentPage="" />
                <Box>
                    {contentRendered}
                </Box>
            </Grid>
        </Grid>
    );
}

export default Artist;