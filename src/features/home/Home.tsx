import { AppBar, Box, Grid, Button } from "@mui/material";
import Nav from "../../components/Nav";
import TopBar from "../../components/TopBar";
import { playlists } from "../../constants/data";
import "./Home.css";

const styleImgCard = {
    width: "100%",
    height: "auto",
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
    return (
        <Button sx={styleCard} variant="contained" fullWidth onClick={() => { alert("Hello") }}>
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

const Home = () => {
    const renderedContent = (
        <Grid container columns={{ xs: 3, sm: 3, md: 4, lg: 5, xl: 9 }} spacing={{ sm: 2, md: 3, lg: 3, xl: 3 }}>
            {playlists.map(playlist => (
                <Grid item key={playlist.id} xs={1} sm={1} md={1} lg={1} xl={1}>
                    <Card id={playlist.id} imgSrc={playlist.imgSrc} title={playlist.title} description={playlist.description} />
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
            <AppBar position="fixed" style={{ top: "calc(100% - 24px)", height: "24px" }}>
                Hello World
            </AppBar>
        </Grid>
    );
}

export default Home;