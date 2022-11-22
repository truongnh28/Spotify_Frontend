import { Box, Stack, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
export default function Search() {
  return (
    <Box sx={{
      px: 3,
    }} >
      <Stack direction="row" spacing={2} sx={{alignItems: "center"}}>
        <SearchIcon fontSize="large" />
        <Typography>Search</Typography>
      </Stack>
    </Box>
  );
}