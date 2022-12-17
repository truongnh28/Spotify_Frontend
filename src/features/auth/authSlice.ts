import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import { userLogin } from "../../models/userLogin";
import { LOGIN } from "../../api/auth";

const initialState = {
    account: {
        user_id: 2,
        username: "truong",
        code: "9ea515ab-66cd-41bc-85a7-e42e2da1d09e",
        role: "Admin",
        status: "Active",
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
        login: (state, action: PayloadAction<{user_id: number; username: string; code: string; role: string; status: string}>) => {
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