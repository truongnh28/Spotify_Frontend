import { Box, Stack } from "@mui/material";
import Playlist from "./Playlist";

export default function MainContent() {
  return (
    <Box sx={{
      backgroundImage: "linear-gradient(to bottom right, #1f1f1f, #121212)",
      px: 3,
      pt: 2,
    }}>
      <Stack spacing={3}>
        <Playlist />
        <Playlist />
        <Playlist />
      </Stack>
    </Box>
  );
}