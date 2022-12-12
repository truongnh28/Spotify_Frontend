import { Box, Stack } from "@mui/material";

const styleContent = {
    backgroundImage: "linear-gradient(to bottom right, #1f1f1f, #121212)",
    px: 4,
    pt: 3,
    height: "100%",
}

export default function Content() {
    return (
        <Box sx={styleContent}>
            <Stack spacing={3} height="100%">

            </Stack>
        </Box>
    );
}