import { configureStore } from "@reduxjs/toolkit";
import currentReducer from "../features/current/currentSlice";
import homeReducer from "../features/home/homeSlice";
import userReducer from "../features/auth/authSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        current: currentReducer,
        home: homeReducer,
        
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;