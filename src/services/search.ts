import { AlbumExpandResponse, AlbumResponse } from "../models/AlbumResponse";
import { ArtistResponse } from "../models/ArtistResponse";
import { SongExpandResponse, SongResponse } from "../models/SongResponse";
import { getAlbumByName, getAllAlbum } from "./albums";
import { getAllArtist, getArtistsByName } from "./artists";
import { getSongsByName } from "./songs";
export const search = async (name: string) => {
    const responses = await Promise.all([getSongsByName(name), getAlbumByName(name), getArtistsByName(name), getAllArtist(), getAllAlbum()]);
    const songsByName: SongResponse[] = responses[0].data.songs;
    const albumsByName: AlbumResponse[] = responses[1].data.albums;
    const artistsByName: ArtistResponse[] = responses[2].data.artists;
    const allArtists: ArtistResponse[] = responses[3].data.artists;
    const allAlbums: AlbumResponse[] = responses[4].data.albums;
    const resultSongs: SongExpandResponse[] = [];
    const resultAlbums: AlbumExpandResponse[] = [];
    const resultArtists: ArtistResponse[] = [];
    songsByName.forEach((song: SongResponse) => {
        const artist = allArtists.find((artist: ArtistResponse) => artist.artist_id === song.artist_id);
        const album = allAlbums.find((album: AlbumResponse) => album.album_id === song.album_id);
        resultSongs.push({
            ...song,
            artist_name: artist?.name as string,
            album_name: album?.name as string,
        })
    })
    return [resultSongs];
}