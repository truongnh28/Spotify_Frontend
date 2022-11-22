import { Box, Stack, Typography } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';

export default function Home() {
  return (
    <Box sx={{
      px: 3,
    }} >
      <Stack direction="row" spacing={2} sx={{alignItems: "center"}}>
        <HomeIcon fontSize="large" />
        <Typography>Home</Typography>
      </Stack>
    </Box>
  );
}