import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import darkTheme from "./constants/UI";
import Home from "./features/home/Home";
import Search from "./features/search/Search";
import Login from "./features/login/Login";
import SignUp from "./pages/signup";
function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/collection/playlist" element={<Home />} />
                    <Route path="/collection/tracks" element={<Home />}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/signup" element={<SignUp /> }/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;