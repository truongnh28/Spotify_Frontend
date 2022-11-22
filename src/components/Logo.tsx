import { Box } from "@mui/material";
import { ReactComponent as SpotifyLogo } from "../svg/logo.svg";
export default function Logo() {
  return (
    <Box sx={{
      px: 3,
      mb: 2
    }}>
      <SpotifyLogo />
    </Box>
  );
}