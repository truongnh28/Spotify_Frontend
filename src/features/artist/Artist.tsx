import { Grid, Box, Stack, Typography, IconButton, TableContainer, Table, TableBody, TableFooter, Button, Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import Nav from "../../components/Nav";
import Player from "../../components/Player";
import TopBar from "../../components/TopBar";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import Row from "../playlist/Row";
import { useEffect, useState } from "react";
import { SongExpandResponse } from "../../models/SongResponse";
import { getSongsByArtist } from "../../services/songs";
import { ArtistResponse } from "../../models/ArtistResponse";
import { getSingleArtist } from "../../services/artists";
import Avatar from "@mui/material/Avatar";

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

const Artist = () => {
    const { id } = useParams();
    const [artist, setArtist] = useState(null);
    const [songs, setSongs] = useState([] as SongExpandResponse[]);
    useEffect(() => {
        getSingleArtist(Number(id)).then((res) => {
            setArtist(res.data.artists[0]);
        })
        getSongsByArtist(Number(id)).then((res) => {
            setSongs(res.data.songs);
        })
    }, [id]);
    const renderedSongs = songs.map((song: SongExpandResponse, i) => {
        const { name, length } = song;
        return <Row key={song.song_id} order={i + 1} play_list={songs} id={song.song_id} album_id={null} album={null} artist={null} artist_id={null} length={length} name={name} />
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
            <Player />
        </Grid>
    );
}

export default Artist;