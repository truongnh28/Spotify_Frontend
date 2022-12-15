import { Box, IconButton, Slider, Stack, Typography } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import RepeatIcon from '@mui/icons-material/Repeat';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

const Player = () => {
    return (
        <Box height="90px">
            <Stack direction="row" paddingX={2} height="100%" alignItems="center">
                <Stack direction="row" alignItems="center" justifyContent="flex-start" minWidth="180px" width="30%" height={{ height: "56px" }}>
                    <img src="https://i.scdn.co/image/ab67706f00000002ca5a7517156021292e5663a6" alt="" style={{ height: "100%" }} />
                    <Box marginX={2} lineHeight="1.6" maxHeight="100%">
                        <Typography fontWeight="bold">Saying thing</Typography>
                        <Typography fontSize="0.6875rem">Emanuel Fremont</Typography>
                    </Box>
                    <IconButton>
                        <FavoriteBorderIcon />
                    </IconButton>
                </Stack>
                <Stack direction="column" alignItems="center" justifyContent="center" maxWidth="722px" width="40%">
                    <Stack direction="row" marginBottom="8px">
                        <Stack direction="row" justifyContent="flex-end">
                            <IconButton><ShuffleIcon /></IconButton>
                            <IconButton><SkipPreviousIcon /></IconButton>
                        </Stack>
                        <IconButton><PlayCircleIcon /></IconButton>
                        <Stack direction="row" justifyContent="flex-start">
                            <IconButton><SkipNextIcon /></IconButton>
                            <IconButton><RepeatIcon /></IconButton>
                        </Stack>
                    </Stack>
                    <Stack direction="row" width="100%" alignItems="center" gap={2}>
                        <Typography textAlign="right" minWidth="40px" fontWeight="bold" fontSize="0.6785rem">0:34</Typography>
                        <Slider value={28}/>
                        <Typography textAlign="left" minWidth="40px" fontWeight="bold" fontSize="0.6785rem">2:03</Typography>
                    </Stack>
                </Stack>
                <Stack direction="row" alignItems="center" justifyContent="flex-end" minWidth="180px" width="30%">
                    <Stack direction="row" width="100%" alignItems="center">
                        <IconButton><VolumeUpIcon /></IconButton>
                        <Slider value={100}/>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    );
}

export default Player;