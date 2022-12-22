import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import darkTheme from "./constants/UI";
import Home from "./features/home/Home";
import Search from "./features/search/Search";
import Login from "./features/login/Login";
import Album from "./features/album/Album";
import Artist from "./features/artist/Artist";
import SignUp from "./features/signup/SignUp";
import Playlist from "./features/playlist/Playlist";
import { getUserFromLocalStorage } from "./utils/getUserFromStorage";
import { useAppDispatch } from "./app/hooks";
import { load } from "./features/auth/authSlice";
import MusicPlayer from "./components/MusicPlayer";
import React from "react";
function App() {
    const dispatch = useAppDispatch();
    const user = getUserFromLocalStorage();
    if (user !== null) {
        dispatch(load(user));
    }
    const isLoggedIn = user !== null;
    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <React.Fragment>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={
                                <div>
                                    <MusicPlayer />
                                    <Home />
                                </div>
                            } />
                            <Route path="/search" element={
                                <div>
                                    <MusicPlayer />
                                    <Search />
                                </div>
                            } />
                            <Route path="/playlist/:playlistId" element={
                                <div>
                                    <MusicPlayer />
                                    <Playlist />
                                </div>
                            } />
                            <Route path="/album/:albumId" element={
                                <div>
                                    <MusicPlayer />
                                    <Album />
                                </div>
                            } />
                            <Route path="/artist/:artistId" element={
                                <div>
                                    <MusicPlayer />
                                    <Artist />
                                </div>
                            } />
                            {!isLoggedIn && <Route path="/login" element={<Login />} />}
                            {!isLoggedIn && <Route path="/signup" element={<SignUp />} />}
                        </Routes>
                    </BrowserRouter>
                </React.Fragment>
            </ThemeProvider>
        </div>
    );
}

export default App;