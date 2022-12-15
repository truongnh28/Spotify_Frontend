import { Grid, Box, AppBar } from "@mui/material";
import { useParams } from "react-router-dom";
import Nav from "../../components/Nav";
import Player from "../../components/Player";
import TopBar from "../../components/TopBar";
import { playlists } from "../../constants/data";

const Playlist = () => {
    const { id } = useParams();
    const playlist = playlists.find(playlist => playlist.id === Number(id as string));
    
    return (
        <Grid direction="row" container height="100%">
            <Grid position="fixed" width="203px" height="100%">
                <Nav currentPage="" />
            </Grid>
            <Grid marginLeft="203px" height="100%" width="100%">
                <TopBar currentPage="Home" />
                <Box sx={{ flexGrow: 1, px: 4, pt: 3 }}>
                </Box>
            </Grid>
            <AppBar position="fixed" style={{ top: "calc(100% - 90px)", height: "90px" }}>
                <Player />
            </AppBar>
        </Grid>
    );
}

export default Playlist;