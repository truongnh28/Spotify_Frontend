import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import darkTheme from "./constants/UI";
import Home from "./pages/home/Home";
import Search from "./pages/search/Search";
import Login from "./pages/login/Login";
import Album from "./pages/album/Album";
import Artist from "./pages/artist/Artist";
import SignUp from "./pages/signup/SignUp";
import Playlist from "./pages/playlist/Playlist";
import { getUserFromLocalStorage } from "./utils/getUserFromStorage";
import { useAppDispatch } from "./app/hooks";
import { load } from "./features/auth/authSlice";
import MusicPlayer from "./components/MusicPlayer";
import React from "react";
import LikedSong from "./pages/likedSong/LikedSong";
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
                            <Route path="/collection/tracks" element={
                                <div>
                                    <MusicPlayer />
                                    <LikedSong />
                                </div>
                            }/>
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