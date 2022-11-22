import { AppBar, Button, Divider, Stack, Typography } from "@mui/material";

export default function MainAppBar() {
  return (
    <AppBar sx={{
      bgcolor: "#101010",
      py: 1,
      backgroundImage: "linear-gradient(#101010, #0f0f0f)"
    }} position="sticky">
      <Stack direction="row" 
        justifyContent="flex-end" 
        alignItems={"center"}
        spacing={2}
      >
        <Typography variant="h6">Premium</Typography>
        <Typography variant="h6">Support</Typography>
        <Typography variant="h6">Download</Typography>
        <Divider orientation="vertical" flexItem />
        <Typography variant="h6">Sign up</Typography>
        <Button sx={{
          bgcolor: "#ffffff",
          borderRadius: "500px",
          "&:hover": {
            backgroundColor: "#ffffff"
          }
        }}
        >
          <Typography variant="h6" sx={{color: "#000000", textTransform: "none", px: 2}}>Log in</Typography>
        </Button>
      </Stack>
    </AppBar>
  );
}