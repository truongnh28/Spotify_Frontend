import { Box, Stack } from "@mui/material";
import BottomSidebar from "./BottomSidebar";
import Logo from "./Logo";
import TopSidebar from "./TopSidebar";

export default function SideBar() {
  return (
    <Box sx={{
      pt: 3,
      backgroundColor: "#000000",
      position: "sticky",
    }} >
      <Stack spacing={2}>
        <Logo />
        <Stack spacing={4}>
          <TopSidebar />
          <BottomSidebar />
        </Stack>
      </Stack>
    </Box>
  );
}