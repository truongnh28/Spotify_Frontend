import { Grid, Box, Stack, Typography, IconButton, TableContainer, Table, TableBody, TableFooter, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import Nav from "../../components/Nav";
import Player from "../../components/Player";
import TopBar from "../../components/TopBar";
import { artist_1 } from "../../constants/data";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import Row from "../playlist/Row";

const Artist = () => {
    const { id } = useParams();
    console.log(id);
    const renderedSongs = artist_1.map((song, i) => {
        const { id, name, album, artist, length } = song;
        return <Row id={id} name={name} album={null} artist={null} length={length} order={i + 1} />
    });
    return (
        <Grid direction="row" container height="100%">
            <Grid position="fixed" width="203px" height="100%">
                <Nav currentPage="" />
            </Grid>
            <Grid marginLeft="203px" height="100%" width="100%">
                <TopBar currentPage="" />
                <Box>
                    <Stack paddingX={4} paddingBottom={3}>
                        <Stack direction="row">
                            <Stack direction="column" justifyContent="flex-end" lineHeight="25.6px" spacing={1}>
                                <Typography color="white" fontSize={{ xs: "2rem", sm: "2rem", md: "4.5rem", lg: "6rem", xl: "6rem" }} fontWeight="bold">{"Anders Linros"}</Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Box>
                        <Box height="104px">
                            <Stack paddingX={4} paddingY={3} direction="row" justifyContent="flex-start" spacing={4} alignItems="center">
                                <IconButton color="success" style={{ height: "56px", width: "56px" }}>
                                    <PlayCircleIcon style={{ height: "56px", width: "56px" }} />
                                </IconButton>
                                <Button variant="outlined" color="inherit" style={{height: "32px"}}>
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
                                <Box height="90px"/>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Grid>
            <Player />
        </Grid>
    );
}

export default Artist;