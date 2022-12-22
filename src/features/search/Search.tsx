import { Grid } from "@mui/material";
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
            </Grid>
        </Grid>
    );
}

export default Search;