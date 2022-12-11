import { Box } from "@mui/material";
import MainContent from "../../../components/MainContent";
import AppBarUser from "./AppBarUser";
import AppBarUserSearch from "./AppBarUserSearch";

const MainUser = () => {
    return (
        <Box marginLeft="233px">
            <AppBarUser />
            <MainContent />
        </Box>
    )
}

export default MainUser;