import { IconButton, Link, Stack, TableCell, TableRow, Typography } from "@mui/material";
import React from "react";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { convertToMinuteAndSecond } from "../../utils/convert";

const styleRow = {
    "&:hover": {
        bgcolor: "hsla(0,0%,100%,.1)",
    }
}

const Row = ({ id, name, album_id, artist_id, album, artist, length, order }: {
    id: number;
    name: string;
    album_id: number | null | undefined;
    artist_id: number | null | undefined;
    album: number | string | null | undefined;
    artist: number | string | null | undefined;
    length: number;
    order: number;
}) => {
    const [isHover, setIsHover] = React.useState(false);
    const index = <Typography fontSize="0.875rem" color="#b3b3b3">{order}</Typography>
    const time = convertToMinuteAndSecond(length);
    return (
        <TableRow key={id} sx={styleRow} onMouseEnter={() => void setIsHover(true)} onMouseLeave={() => void setIsHover(false)}>
            <TableCell sx={isHover ? { paddingX: 0 } : undefined}>
                {isHover ? (<IconButton><PlayArrowIcon /></IconButton>) : index}
            </TableCell>
            <TableCell>
                <Typography fontSize="1rem" color="white">{name}</Typography>
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
                    <Typography><IconButton><FavoriteBorderIcon /></IconButton></Typography>
                    <Typography>{time}</Typography>
                </Stack>
            </TableCell>
        </TableRow>
    );
}

export default Row;