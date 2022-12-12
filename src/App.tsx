import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import darkTheme from "./constants/UI";
import Home from "./features/home/Home";
import Login from "./pages/login";
import SignUp from "./pages/signup";
function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Home />} />
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