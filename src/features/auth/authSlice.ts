import { createSlice } from "@reduxjs/toolkit";

interface authState {
    user: string | null;
}

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null
    } as authState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state, action) => {
            state.user = null;
        }
    },
});

export default authSlice.reducer;

export const { login, logout } = authSlice.actions;