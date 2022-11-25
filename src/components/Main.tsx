import { Box, Typography } from "@mui/material";
import MainAppBar from "./MainAppBar";
import MainContent from "./MainContent";

export default function Main() {
    return (
        <Box marginLeft="233px">
            <MainAppBar />
            <MainContent />
        </Box>
    );
}