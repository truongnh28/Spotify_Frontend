import axios from "axios"
import { GET_ALBUM_BY_NAME, GET_ALL_ALBUMS, GET_SINGLE_ALBUM } from "../api/albums"

export const getAllAlbum = async () => {
    return await axios.get(`${GET_ALL_ALBUMS}`);
}

export const getSingleAlbum = async (id: number) => {
    return await axios.get(`${GET_SINGLE_ALBUM}/${id}`);
}

export const getAlbumByName = async (name: string) => {
    return await axios.get(`${GET_ALBUM_BY_NAME}/${name}`);
}