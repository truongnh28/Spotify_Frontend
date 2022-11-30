import { AppBar, Button, Link, Stack, Typography } from "@mui/material";

export default function MainAppBar() {
    return (
        <AppBar sx={{
            py: 1,
            pr: 2,
            backgroundImage: "linear-gradient(#101010, #0f0f0f)",
            position: "sticky",
        }}>
            <Stack direction="row"
                justifyContent="flex-end"
                alignItems={"center"}
                spacing={2}
            >
                <Link variant="h6" color="white" underline="none">Sign up</Link>
                <Button sx={{
                    bgcolor: "#ffffff",
                    borderRadius: "500px",
                    "&:hover": {
                        backgroundColor: "#ffffff"
                    }
                }}
                >
                    <Typography variant="h6" sx={{ color: "#000000", textTransform: "none", px: 2 }}>Log in</Typography>
                </Button>
            </Stack>
        </AppBar>
    );
}