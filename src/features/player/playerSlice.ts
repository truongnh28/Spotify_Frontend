import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PlayerState } from "../../models/Player";
import { RootState } from "../../app/store";

export interface UpdatePayload {
    [key: string]: any;
}

const initialState = {
    currentId: -1,
    currentSong: null,
    playlist: [],
    playing: false,
    repeat: 0,
    shuffle: false,
    currentTime: 0,
    currentVolume: 100,
} as PlayerState;

export const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
        play: (state, action) => {
            state.currentId = action.payload.id;
            state.currentSong = action.payload.song;
            state.playlist = action.payload.playlists;
            state.playing = true;
        },
        pause: (state) => {
            state.playing = false;
        },
        update: (state, action: PayloadAction<PlayerState>) => {
            state.currentId = action.payload.currentId;
            state.currentSong = action.payload.currentSong;
            state.currentTime = action.payload.currentTime;
            state.currentVolume = action.payload.currentVolume;
            state.playing = action.payload.playing;
            state.playlist = action.payload.playlist;
            state.repeat = action.payload.repeat;
            state.shuffle = action.payload.shuffle;
        },
        nextSong: (state) => {
            const shuffle = state.shuffle;
            const repeat = state.repeat;
            const length = state.playlist.length;
            if (shuffle) {
                const randomSong = state.playlist[Math.floor(Math.random() * length)];
                state.currentSong = randomSong;
                return;
            }
            if (repeat) {
                if (state.currentId === length - 1) {
                    state.currentId = 0;
                    state.currentSong = state.playlist[0];
                    return;
                }
                state.currentId += 1;
                state.currentSong = state.playlist[state.currentId];
                return;
            }
            if (state.currentId === length - 1) {
                state.currentId = -1;
                state.currentSong = null;
                state.playing = false;
                state.repeat = 0;
                state.shuffle = false;
                state.currentTime = 0;
            }
        }
    }
});

export default playerSlice.reducer;

export const { play, pause, nextSong, update } = playerSlice.actions;

export const selectPlayerState = (state: RootState) => state.player;