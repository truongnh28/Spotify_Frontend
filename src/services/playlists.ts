import axios from "axios"
import {GET_SINGLE_PLAYLIST, GET_PLAYLISTS_BY_NAME, GET_PLAYLISTS_BY_USER, GET_ALL_PLAYLISTS} from "../api/playlists";

export const getAllPlaylist = async () => {
    return await axios.get(`${GET_ALL_PLAYLISTS}`);
}

export const getSinglePlaylist = async (id: number) => {
    return await axios.get(`${GET_SINGLE_PLAYLIST}/${id}`)
}

export const getPlaylistByName = async (name: string) => {
    return await axios.get(`${GET_PLAYLISTS_BY_NAME}/${name}`)
}

export const getPlaylistByUser = async (userId: number) => {
    return await axios.get(`${GET_PLAYLISTS_BY_USER}/${userId}`)
}