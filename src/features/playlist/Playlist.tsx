import { Grid, Box, Stack, Typography, IconButton, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Link } from "@mui/material";
import { useParams } from "react-router-dom";
import Nav from "../../components/Nav";
import Player from "../../components/Player";
import TopBar from "../../components/TopBar";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TableFooter from "@mui/material/TableFooter";
import Row from "./Row";
import { useEffect, useState } from "react";
import { PlaylistResponse } from "../../models/PlaylistResponse";
import { SongExpandResponse } from "../../models/SongResponse";
import { getSongsInfoOfPlaylist } from "../../services/songs";
import { getSinglePlaylist } from "../../services/playlists";

const Playlist = () => {
    const { id } = useParams();
    const [playlist, setPlaylist] = useState(null);
    const [songs, setSongs] = useState([] as SongExpandResponse[]);
    useEffect(() => {
        getSinglePlaylist(Number(id)).then((res) => {
            setPlaylist(res.data.play_lists[0]);
        })
        getSongsInfoOfPlaylist(Number(id)).then((resSongs) => {
            setSongs(resSongs);
        });
    }, [id]);
    const renderedSongs = songs.map((song: SongExpandResponse, i) => {
        const { song_id, name, length, album_id, artist_id, album_name, artist_name } = song;
        return <Row key={song_id} id={song_id} name={name} album_id={album_id} artist_id={artist_id} play_list={songs} album={album_name} artist={artist_name} length={length} order={i + 1} />
    })
    let renderedPlaylist = null;
    if (playlist) {
        renderedPlaylist = playlist as PlaylistResponse;
    }
    let contentRendered = <Typography fontSize="1.5rem">Not Found Specific Playlist</Typography>;
    if (playlist && renderedPlaylist) {
        contentRendered = (
            <>
                <Stack paddingX={4} paddingBottom={3}>
                    <Stack direction="row">
                        <Box marginRight={3} height={{ xs: "192px", sm: "192px", md: "192px", lg: "232px", xl: "232px" }} >
                            <img src={renderedPlaylist.cover_img} alt="" style={{ height: "100%", width: "auto" }} />
                        </Box>
                        <Stack direction="column" justifyContent="flex-end" lineHeight="25.6px" spacing={1}>
                            <Typography color="white" fontSize="12px" fontWeight="bold">PLAYLIST</Typography>
                            <Typography color="white" fontSize={{ xs: "2rem", sm: "2rem", md: "4.5rem", lg: "6rem", xl: "6rem" }} fontWeight="bold">{renderedPlaylist.name}</Typography>
                            {/* <Typography color="#b3b3b3" fontSize="1rem">{renderedPlaylist.name}</Typography> */}
                            <Typography color="white" fontSize="0.875rem">
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
                                            <TableCell align="left"><Typography color="#b3b3b3">ALBUM</Typography></TableCell>
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
            <Player />
        </Grid>
    );
}

export default Playlist;