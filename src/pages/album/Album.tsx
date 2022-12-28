import { Grid, Box, Stack, Typography, IconButton, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import Nav from "../../components/Nav";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { useEffect, useState } from "react";
import { SongExpandResponse } from "../../models/SongResponse";
import { getSongsByAlbum } from "../../services/songs";
import { getAlbumInfo } from "../../services/albums";
import { AlbumExpandResponse } from "../../models/AlbumResponse";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectCurrentSong, selectPlaying, setCurrentSong, setSongList, togglePlaying } from "../../features/player/playerSlice";
import { convertToMinuteAndSecond } from "../../utils/convert";
import LikeButton from "../../components/LikeButton";
import TopBar from "../../components/TopBar";

const styleRow = {
    "&:hover": {
        bgcolor: "hsla(0,0%,100%,.1)",
    }
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
        })
    }, [albumId, dispatch]);
    const handlePlayButton = (index: number) => {
        if (currentSong === index) {
            dispatch(togglePlaying(playing));
        } else {
            if (playing === true) {
                dispatch(setCurrentSong(index));
            } else {
                dispatch(setSongList(songs));
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
                            <Typography color="white" fontSize={{ xs: "2rem", sm: "2rem", md: "3.5rem", lg: "4.5rem", xl: "6rem" }} fontWeight="bold">{renderedAlbum.name}</Typography>
                            <Typography color="white" fontSize="0.875rem">
                                <Link to={`/artist/${renderedAlbum.artist_id}`} style={{textDecoration: "none", color: "white", fontWeight:"bold"}} >{renderedAlbum.artist_name}</Link>
                                &nbsp;
                                &#x2022;
                                &nbsp;
                                {songs.length} songs
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
                            {/* <IconButton style={{ height: "56px", width: "56px" }}>
                                <FavoriteBorderIcon style={{ height: "56px", width: "56px" }} />
                            </IconButton> */}
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
                                </Table>
                            </TableContainer>
                            <Box height="180px" />
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
                <TopBar />
                <Box>
                    {contentRendered}
                </Box>
            </Grid>
        </Grid>
    );
}

export default Album;