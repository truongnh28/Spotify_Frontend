import { Grid, AppBar } from "@mui/material";
import Content from "../../components/Content";
import Nav from "../../components/Nav";
import TopBar from "../../components/TopBar";

const Search = () => {
    return (
        <Grid direction="row" container height="100%">
            <Grid item position="fixed" width="203px" height="100%">
                <Nav currentPage="Search" />
            </Grid>
            <Grid item marginLeft="203px" height="100%" width="100%">
                <TopBar currentPage="Search" />
                <Content />
            </Grid>
            <AppBar position="fixed" style={{ top: "calc(100% - 24px)", height: "24px" }}>
                Hello World
            </AppBar>
        </Grid>
    );
}

export default Search;