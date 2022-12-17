import axios from "axios"
import { GET_ALBUM_BY_NAME, GET_ALL_ALBUMS, GET_SINGLE_ALBUM } from "../api/albums"
import { getAllArtist } from "./artists";
import { AlbumResponse } from "../models/AlbumResponse";
import { ArtistResponse } from "../models/ArtistResponse";

export const getAllAlbum = async () => {
    return await axios.get(`${GET_ALL_ALBUMS}`);
}

export const getSingleAlbum = async (id: number) => {
    return await axios.get(`${GET_SINGLE_ALBUM}/${id}`);
}

export const getAlbumByName = async (name: string) => {
    return await axios.get(`${GET_ALBUM_BY_NAME}/${name}`);
}

export const getAlbumInfo = async (albumId: number) => {
    try {
        const responses = await Promise.all([getSingleAlbum(albumId), getAllArtist()]);
        const album: AlbumResponse = responses[0].data.albums[0];
        const artists: ArtistResponse[] = responses[1].data.artists;
        const artistAlbum = artists.find((artist: ArtistResponse) => artist.artist_id === album.artist_id);
        return {
            ...album,
            artist_name: artistAlbum?.name,
        }
    } catch(error) {
        return undefined;
    }
}