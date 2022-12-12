import { Button, Stack, Typography } from "@mui/material";

interface dataOfCardMusic {
    imgSrc: string;
    title: string;
    description: string;
}

export default function CardMusic(props: dataOfCardMusic) {
    const {imgSrc, title, description } = props;
    return (
        <Button sx={{
            backgroundColor: "#161616",
            color: "white",
            textTransform: "none",
            textAlign: "left",
        }}
        >
            <Stack p={2} spacing={1}>
                <img src={imgSrc} alt="" width="100%" height="100%" />
                <Typography><b>{title}</b></Typography>
                <Typography>{description}</Typography>
            </Stack>
        </Button>
    );
}