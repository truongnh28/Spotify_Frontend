import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "../features/home/homeSlice";
import userReducer from "../features/auth/authSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        home: homeReducer,
        
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;