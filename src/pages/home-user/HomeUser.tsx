import { CardMedia, CssBaseline, ThemeProvider } from "@mui/material";
import { Stack } from "@mui/system";
import SideBar from "../../components/Nav";
import darkTheme from "../../consts/UI";
import MainUser from "./components/MainUser";


const HomeUser = () => {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Stack direction="row" bgcolor="black" >
                <SideBar />
                <MainUser />
                <CardMedia src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"/>
            </Stack>
        </ThemeProvider>
    );
};

export default HomeUser;