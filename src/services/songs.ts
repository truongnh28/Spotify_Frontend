import axios from "axios"
import { GET_ALL_SONGS, GET_SONGS_BY_ALBUM, GET_SONGS_BY_ARTIST, GET_SONGS_BY_NAME, GET_SONGS_BY_PLAYLIST, GET_SONGS_LIKED_BY_USER } from "../api/songs"
import { getAllAlbum, getSingleAlbum } from "./albums";
import { getAllArtist, getSingleArtist } from "./artists";
import { SongExpandResponse, SongResponse } from "../models/SongResponse";
import { AlbumResponse } from "../models/AlbumResponse";
import { ArtistResponse } from "../models/ArtistResponse";

export const getAllSongs = async () => {
    return await axios.get(`${GET_ALL_SONGS}`);
}

export const getSongsByPlaylist = async (playlistId: number) => {
    return await axios.get(`${GET_SONGS_BY_PLAYLIST}/${playlistId}`);
}

export const getSongsByAlbum = async (albumId: number) => {
    return await axios.get(`${GET_SONGS_BY_ALBUM}/${albumId}`);
}

export const getSongsByArtist = async (artistId: number) => {
    return await axios.get(`${GET_SONGS_BY_ARTIST}/${artistId}`);
}

export const getSongsLikedByUser = async (userId: number) => {
    return await axios.get(`${GET_SONGS_LIKED_BY_USER}/${userId}`);
}

export const getSongsByName = async (name: string) => {
    return await axios.get(`${GET_SONGS_BY_NAME}/${name}`);
}

export const getSongsInfoOfPlaylist = async (playlistId: number) => {
    try {
        const responses = await Promise.all([getSongsByPlaylist(playlistId), getAllAlbum(), getAllArtist()]);
        const songs: SongResponse[] = responses[0].data.songs;
        const albums: AlbumResponse[] = responses[1].data.albums;
        const artists: ArtistResponse[] = responses[2].data.artists;
        const result: SongExpandResponse[] = [];
        songs.forEach((song: SongResponse, id) => {
            const album = albums.find((album: AlbumResponse) => album.album_id === song.album_id);
            const artist = artists.find((artist: ArtistResponse) => artist.artist_id === song.album_id);
            result.push({
                ...song,
                album_name: album?.name,
                artist_name: artist?.name,
            })
        });
        return result;
    } catch(error) {
        return [];
    }
}

export const getSongsInfoOfPlaylistV2 = async (playlistId: number) => {
    try {
        const response = await getSongsByPlaylist(playlistId);
        const songs = response.data.songs;
        const result: SongExpandResponse[] = [];
        songs.forEach(async (song: SongResponse) => {
            const responses = await Promise.all([getSingleAlbum(song.album_id), getSingleArtist(song.artist_id)]);
            const album = responses[0].data.albums;
            const artist = responses[1].data.artists;
            result.push({...song, album_name: album.name, artist_name: artist.name});
        })
        return result;
    } catch(error) {
        return [];
    }
}

export const getSongs = async () => {
    try {
        const responses = await Promise.all([getAllSongs(), getAllAlbum(), getAllArtist()]);
        const songs = responses[0].data.songs;
        const albums = responses[1].data.albums;
        const artists = responses[2].data.artists;
        let result: SongExpandResponse[] = [];
        songs.forEach((song: SongResponse) => {
            const album = albums.find((album: AlbumResponse) => album.album_id === song.album_id);
            const artist = artists.find((artist: ArtistResponse) => artist.artist_id === song.artist_id);
            result.push({...song, album_name: album.name, artist_name: artist.name});
        })
        return result;
    } catch (error) {
        return [];
    }
}