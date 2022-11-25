import { Box, createTheme, CssBaseline, Grid, Stack, ThemeProvider, Typography } from "@mui/material";
import Main from "./components/Main";
import SideBar from "./components/Sidebar";

const darkTheme = createTheme({
    palette: {
        mode: "dark"
    }
});

function App() {
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

export default App;