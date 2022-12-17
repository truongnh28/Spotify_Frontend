import { SongResponse } from "./SongResponse"

export interface PlayerState {
    currentId: number;
    currentSong: SongResponse | null;
    playlist: SongResponse[];
    playing: boolean; // false: no, true: yes
    repeat: number; // 0: no repeat, 1: repeat the playlist, 2: repeat once
    shuffle: boolean; // false: no, true: yes
    currentTime: number;
    currentVolume: number;
}