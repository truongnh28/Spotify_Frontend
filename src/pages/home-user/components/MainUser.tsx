import { Box } from "@mui/material";
import Content from "../../../components/Content";
import AppBarUser from "./AppBarUser";
import AppBarUserSearch from "./AppBarUserSearch";

const MainUser = () => {
    return (
        <Box marginLeft="233px">
            <AppBarUser />
            <Content />
        </Box>
    )
}

export default MainUser;