import { CssBaseline, Stack, ThemeProvider } from "@mui/material";
import Main from "../../components/Main";
import SideBar from "../../components/Sidebar";
import darkTheme from "../../consts/UI";
import HomeMain from "./components/HomeMain";

const Home = () => {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Stack direction="row" bgcolor="black">
                <SideBar />
                <Main />
            </Stack>
        </ThemeProvider>
    );
}

export default Home;