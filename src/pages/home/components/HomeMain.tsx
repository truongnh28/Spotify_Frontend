import { Box } from "@mui/material";
import MainContent from "../../../components/MainContent";
import AppBarSearch from "./AppBarSearch";

export default function HomeMain() {
    return (
        <Box marginLeft="233px">
            <AppBarSearch />
            <MainContent />
        </Box>
    );
}