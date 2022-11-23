import { Box, Stack, Typography } from "@mui/material";
import CardMusic from "./CardMusic";

export default function Playlist() {
  const musics = [<CardMusic key="1" />, <CardMusic key="2" />,
   <CardMusic key="3" />, <CardMusic key="4" />, <CardMusic key="5" />];
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" pb={3} alignItems="center">
        <Typography variant="h5">Spotify Playlists</Typography>
        <Typography>SEE ALL</Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" spacing={3}>
        {musics}
      </Stack>
    </Box>
  );
}