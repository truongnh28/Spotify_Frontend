import { Box } from "@mui/material";
import Content from "../../../components/Content";
import AppBarSearch from "./AppBarSearch";

export default function HomeMain() {
    return (
        <Box marginLeft="233px">
            <AppBarSearch />
            <Content />
        </Box>
    );
}