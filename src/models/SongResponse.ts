export interface SongResponse {
    song_id: number;
    name: string;
    album_id: number;
    artist_id: number;
    lyrics: string;
    length: number;
    url: string;
    youtube_link: string;
}

export interface SongExpandResponse {
    album_name: string | undefined; 
    artist_name: string | undefined; 
    song_id: number; 
    name: string; 
    album_id: number; 
    artist_id: number; 
    lyrics: string; 
    length: number; 
    url: string; 
    youtube_link: string;
}