import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import darkTheme from "./constants/UI";
import Home from "./features/home/Home";
import Search from "./features/search/Search";
import Login from "./features/login/Login";
import { useAppSelector } from "./app/hooks";
import { selectUser } from "./features/auth/authSlice";
import Album from "./features/album/Album";
import Artist from "./features/artist/Artist";
import SignUp from "./features/signup/SignUp";
import Playlist from "./features/playlist/Playlist";
function App() {
    const user = useAppSelector(selectUser);
    const isLoggedIn = user.username.length > 0 && user.code.length > 0;
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/collection/playlist" element={<Home />} />
                    <Route path="/collection/tracks" element={<Home />}/>
                    <Route path="/playlist/:id" element={<Playlist />} />
                    <Route path="/album/:id" element={<Album />} />
                    <Route path="/artist/:id" element={<Artist />} />
                    { !isLoggedIn && <Route path="/login" element={ <Login />}/>}
                    { !isLoggedIn && <Route path="/signup" element={ <SignUp /> }/>}
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;