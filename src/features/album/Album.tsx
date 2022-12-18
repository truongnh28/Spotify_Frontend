import { Grid, Box, Stack, Typography, IconButton, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TableFooter } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import Nav from "../../components/Nav";
import MusicPlayer from "../../components/MusicPlayer";
import TopBar from "../../components/TopBar";
import { album_1 } from "../../constants/data";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PauseIcon from '@mui/icons-material/Pause';
import { useEffect, useState } from "react";
import { SongExpandResponse } from "../../models/SongResponse";
import { getSongsByAlbum } from "../../services/songs";
import { getAlbumInfo } from "../../services/albums";
import { AlbumExpandResponse } from "../../models/AlbumResponse";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { checkLikedSong, unlikeSong, likedSong } from "../../services/interactions";
import { selectUser } from "../auth/authSlice";
import { selectCurrentSong, selectPlaying, setCurrentSong, setSongList, togglePlaying } from "../player/playerSlice";
import { convertToMinuteAndSecond } from "../../utils/convert";

const styleRow = {
    "&:hover": {
        bgcolor: "hsla(0,0%,100%,.1)",
    }
}

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

const Album = () => {
    const { albumId } = useParams();
    const dispatch = useAppDispatch();
    const [songs, setSongs] = useState([] as SongExpandResponse[]);
    const [album, setAlbum] = useState<AlbumExpandResponse | undefined>();
    const playing = useAppSelector(selectPlaying);
    const currentSong = useAppSelector(selectCurrentSong);
    useEffect(() => {
        getAlbumInfo(Number(albumId)).then((res) => {
            setAlbum(res)
        })
        getSongsByAlbum(Number(albumId)).then((res) => {
            setSongs(res.data.songs);
            dispatch(setSongList(res.data.songs));
        })
    }, [albumId, dispatch]);
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
    const renderedSongs = songs.map((song, index) => {
        const { song_id, name, artist_id, artist_name, length } = song;
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
                    <Link to={`/artist/${artist_id}`} style={{ fontSize: "0.875rem", color: "#b3b3b3", textDecoration: "none"}}>{artist_name}</Link>
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
    let renderedAlbum = null;
    if (album) {
        renderedAlbum = album as AlbumExpandResponse;
    }
    let contentRendered = <Typography>Not found specific album</Typography>
    if (album && renderedAlbum) {
        contentRendered = (
            <>
                <Stack paddingX={4} paddingBottom={3}>
                    <Stack direction="row">
                        <Box marginRight={3} height={{ xs: "192px", sm: "192px", md: "192px", lg: "232px", xl: "232px" }} >
                            <img src={renderedAlbum.cover_img} alt="" style={{ height: "100%", width: "auto" }} />
                        </Box>
                        <Stack direction="column" justifyContent="flex-end" lineHeight="25.6px" spacing={1}>
                            <Typography color="white" fontSize={{ xs: "2rem", sm: "2rem", md: "4.5rem", lg: "6rem", xl: "6rem" }} fontWeight="bold">{renderedAlbum.name}</Typography>
                            <Typography color="white" fontSize="0.875rem">
                                <Link to={`/artist/${renderedAlbum.artist_id}`} style={{textDecoration: "none", color: "white", fontWeight:"bold"}} >{renderedAlbum.artist_name}</Link>
                                &nbsp;
                                &#x2022;
                                &nbsp;
                                {album_1.length} songs
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
                <Box>
                    <Box height="104px">
                        <Stack paddingX={4} paddingY={3} direction="row" justifyContent="flex-start" spacing={4}>
                            <IconButton color="success" style={{ height: "56px", width: "56px" }}>
                                <PlayCircleIcon style={{ height: "56px", width: "56px" }} />
                            </IconButton>
                            <IconButton style={{ height: "56px", width: "56px" }}>
                                <FavoriteBorderIcon style={{ height: "56px", width: "56px" }} />
                            </IconButton>
                        </Stack>
                    </Box>
                    <Box>
                        <Box paddingX={4}>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left"><Typography color="#b3b3b3">#</Typography></TableCell>
                                            <TableCell align="left"><Typography color="#b3b3b3">TITLE</Typography></TableCell>
                                            <TableCell align="right"><Typography color="#b3b3b3"><AccessTimeIcon /></Typography></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {renderedSongs}
                                    </TableBody>
                                    <TableFooter>
                                        <Box height="90px" />
                                    </TableFooter>
                                </Table>
                            </TableContainer>
                            <Box height="90px" />
                        </Box>
                    </Box>
                </Box>
            </>
        )
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

export default Album;