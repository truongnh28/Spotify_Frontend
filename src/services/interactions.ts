import axios from "axios"
import { LIKE_SONG, UNLIKE_SONG } from "../api/interactions"
import { getSongsLikedByUser } from "./songs";
import { SongResponse } from "../models/SongResponse";

export const likedSong = async (userId: number, songId: number) => {
    return await axios.post(`${LIKE_SONG}/${userId}/${songId}`);
}

export const unlikeSong = async (userId: number, songId: number) => {
    return await axios.delete(`${UNLIKE_SONG}/${userId}/${songId}`);
}

export const checkLikedSong = async (userId: number, songId: number) => {
    const response = await getSongsLikedByUser(userId);
    const songs = response.data.songs;
    const foundSong = songs.find((song: SongResponse) => song.song_id === songId);
    if (foundSong)
        return true;
    return false;
}