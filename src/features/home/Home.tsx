import { Box, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/Nav";
import MusicPlayer from "../../components/MusicPlayer";
import TopBar from "../../components/TopBar";
import { PlaylistResponse } from "../../models/PlaylistResponse";
import defaultImage from "../../assets/default-image.png";
import "./Home.css";
import { useEffect, useState } from "react";
import { getAllPlaylist } from "../../services/playlists";

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

export const Card = ({ id, imgSrc, title, description }: { id: number, imgSrc: string, title: string, description: string }) => {
    const navigate = useNavigate();
    const handleClickCard = () => {
        navigate(`/playlist/${id}`);
    }
    return (
        <Button sx={styleCard} variant="contained" fullWidth onClick={handleClickCard}>
            <div style={{ textAlign: "left" }}>
                <div>
                    <img src={imgSrc.length > 0 ? imgSrc : defaultImage} alt="" style={styleImgCard} />
                </div>
                <b style={{ color: "white" }}>{title}</b>
                <div className="clamp">{description}</div>
            </div>
        </Button>
    );
}

const Home = () => {
    const [playlists, setPlaylists] = useState([]);
    useEffect(() => {
        getAllPlaylist().then((res) => {
            setPlaylists(res.data.play_lists);
        });
    }, []);
    const renderedContent = (
        <Grid container columns={{ xs: 3, sm: 3, md: 4, lg: 5, xl: 9 }} spacing={{ sm: 2, md: 3, lg: 3, xl: 3 }}>
            {playlists.map((playlist: PlaylistResponse) => (
                <Grid item key={playlist.play_list_id} xs={1} sm={1} md={1} lg={1} xl={1}>
                    <Card id={playlist.play_list_id} imgSrc={playlist.cover_img} title={playlist.name} description={""} />
                </Grid>
            ))}
        </Grid>
    );
    return (
        <Grid direction="row" container height="100%">
            <Grid position="fixed" width="203px" height="100%">
                <Nav currentPage="Home" />
            </Grid>
            <Grid marginLeft="203px" height="100%" width="100%">
                <TopBar currentPage="Home" />
                <Box sx={{ flexGrow: 1, px: 4, pt: 3 }}>
                    {renderedContent}
                </Box>
            </Grid>
        </Grid>
    );
}

export default Home;