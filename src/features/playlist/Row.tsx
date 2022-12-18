import { IconButton, Link, Stack, TableCell, TableRow, Typography } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PauseIcon from '@mui/icons-material/Pause';
import { convertToMinuteAndSecond } from "../../utils/convert";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { SongExpandResponse } from "../../models/SongResponse";
import { selectPlayerState, update } from "../player/playerSlice";
import { checkLikedSong, likedSong, unlikeSong } from "../../services/interactions";
import { selectUser } from "../auth/authSlice";
import { useEffect, useState } from "react";

const styleRow = {
    "&:hover": {
        bgcolor: "hsla(0,0%,100%,.1)",
    }
}

const Row = ({ id, name, album_id, play_list, artist_id, album, artist, length, order }: {
    id: number;
    name: string;
    album_id: number | null | undefined;
    artist_id: number | null | undefined;
    album: number | string | null | undefined;
    artist: number | string | null | undefined;
    length: number;
    order: number;
    play_list: SongExpandResponse[],
}) => {
    const dispatch = useAppDispatch();
    const [isHover, setIsHover] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [liked, setLiked] = useState(false);
    useEffect(() => {
        checkLikedSong(currentUser.user_id, id).then((res) => {
            setLiked(res);
        })
    }, [id]);
    const currentUser = useAppSelector(selectUser);
    const currentState = useAppSelector(selectPlayerState);
    if (currentState.currentId !== -1) {
        setPlaying(true);
    }
    const index = <Typography fontSize="0.875rem" color="#b3b3b3">{order}</Typography>
    const time = convertToMinuteAndSecond(length);
    const hanldePlayButton = (prevState: boolean) => {
        setPlaying(!prevState);
        const newState = {
            ...currentState,
            playing: !prevState,
            currentId: id,
            playlist: play_list, 
        }
        console.log(newState);
    }
    // const hanldePlayButton = (prevState: boolean) => {
    //     setPlaying(!prevState);
    //     const curr = {...currentState,
    //         currentId: id,
    //         play_list: play_list,
    //         playing: !prevState
    //     };
    //     dispatch(update(curr));
    // }
    const handleLikedButton = async (prevState: boolean) => {
        if (!prevState) {
            likedSong(currentUser.user_id, id).then((res) => {
                setLiked(true);
            })
        } else {
            unlikeSong(currentUser.user_id, id).then((res) => {
                setLiked(false);
            })
        }
    }
    return (
        <TableRow key={id} sx={styleRow} onMouseEnter={() => void setIsHover(true)} onMouseLeave={() => void setIsHover(false)}>
            <TableCell sx={isHover ? { paddingX: 0 } : undefined}>
                {isHover ? 
                    (
                        <IconButton onClick={() => hanldePlayButton(playing)}>
                            { playing ? <PauseIcon /> :<PlayArrowIcon /> }
                        </IconButton>
                    ) 
                : index}
            </TableCell>
            <TableCell>
                <Typography fontSize="1rem" color={playing ? "green" : "white"}>{name}</Typography>
                { artist && <Link href={`/artist/${artist_id}`} underline="hover" fontSize="0.875rem" color="#b3b3b3">{artist}</Link> }
            </TableCell>
            {album &&
                (
                    <TableCell>
                        <Link href={`/album/${album_id}`} fontSize="0.875rem" color="#b3b3b3">{album}</Link>
                    </TableCell>
                )
            }
            <TableCell>
                <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={3}>
                    <Typography>
                        <IconButton onClick={() => handleLikedButton(liked)}>
                            { liked ? <FavoriteIcon color="success"/> : <FavoriteBorderIcon /> }
                        </IconButton>
                    </Typography>
                    <Typography>{time}</Typography>
                </Stack>
            </TableCell>
        </TableRow>
    );
}

export default Row;