import { Grid, Box, Stack, Typography, IconButton, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TableFooter, Link } from "@mui/material";
import { useParams } from "react-router-dom";
import Nav from "../../components/Nav";
import Player from "../../components/Player";
import TopBar from "../../components/TopBar";
import { album_1 } from "../../constants/data";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Row from "../playlist/Row";
import { useEffect, useState } from "react";
import { SongExpandResponse } from "../../models/SongResponse";
import { getSongsByAlbum } from "../../services/songs";
import { getAlbumInfo } from "../../services/albums";
import { AlbumExpandResponse } from "../../models/AlbumResponse";

const Album = () => {
    const { id } = useParams();
    const [songs, setSongs] = useState([] as SongExpandResponse[]);
    const [album, setAlbum] = useState<AlbumExpandResponse | undefined>();
    useEffect(() => {
        getAlbumInfo(Number(id)).then((res) => {
            setAlbum(res)
        })
        getSongsByAlbum(Number(id)).then((res) => {
            setSongs(res.data.songs);
        })
    }, [id]);
    const renderedSongs = songs.map((song, i) => {
        const { song_id, name, artist_id, artist_name, length } = song;
        return <Row play_list={songs} key={song_id} id={song_id} name={name} album={null} album_id={null} artist_id={artist_id} artist={artist_name} length={length} order={i + 1} />
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
                                <Link href={`/artist/${renderedAlbum.artist_id}`} underline="hover" color="white" fontWeight="bold">{renderedAlbum.artist_name}</Link>
                                &nbsp;
                                &#x2022;
                                6,768,242 likes
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
            <Player />
        </Grid>
    );
}

export default Album;