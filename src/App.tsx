import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import darkTheme from "./consts/UI";
import Home from "./pages/home";
import Login from "./pages/login";
import SignUp from "./pages/signup";
function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />}/>
                    <Route path="/signup" element={<SignUp /> }/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;