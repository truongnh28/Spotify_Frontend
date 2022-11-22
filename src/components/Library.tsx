import { Box, Stack, Typography } from "@mui/material";
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';

export default function Library() {
  return (
    <Box sx={{
      px: 3,
    }} >
      <Stack direction="row" spacing={2} sx={{alignItems: "center"}}>
        <LibraryMusicIcon fontSize="large" />
        <Typography>Your Library</Typography>
      </Stack>
    </Box>
  );
}