import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import { COOKIE, LOGIN } from "../../constants/urls";
import { userLogin } from "../../models/userLogin";

const initialState = {
    account: {
        username: "",
        code: "",
    },
    error: null,
} as userLogin;

export const loginSpotify = createAsyncThunk("auth/login", async ({ username, password }: { username: string, password: string }) => {
    const response = await axios.post(LOGIN, { username, password }, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    });
    return response.headers;
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{username: string; code: string}>) => {
            state.account = action.payload;
        },
        logout: (state) => {
            state.account.username = "";
            state.account.code = "";
        }
    },
    extraReducers(builder) {
        builder
            .addCase(loginSpotify.fulfilled, (state, action) => {
                console.log(action.payload);
            })
            .addCase(loginSpotify.rejected, (state, action) => {
                state.error = action.error.message?.toString();
            })
    },
});

export default authSlice.reducer;

export const { login, logout } = authSlice.actions;

export const selectUser = (state: RootState) => state.user.account;