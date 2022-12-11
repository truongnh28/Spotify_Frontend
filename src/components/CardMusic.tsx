import { Button, Stack, Typography } from "@mui/material";

export default function CardMusic() {
    const data = {
        imgSrc: "https://i.scdn.co/image/ab67706f00000002ca5a7517156021292e5663a6",
        title: "Peaceful Piano",
        description: "Relax and indulge with beautiful piano pieces",
    }
    return (
        <Button sx={{
            backgroundColor: "#161616",
            color: "white",
            textTransform: "none",
            textAlign: "left",
        }}
        >
            <Stack p={2} spacing={1}>
                <img src={data.imgSrc} alt="" width="100%" height="100%" />
                <Typography variant="h6"><b>{data.title}</b></Typography>
                <Typography>{data.description}</Typography>
            </Stack>
        </Button>
    );
}