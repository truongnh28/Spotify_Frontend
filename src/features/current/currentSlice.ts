import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface currentPageState {
    page: string;
}

export const currentSlice = createSlice({
    name: "current",
    initialState: {
        page: "Home",
    } as currentPageState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.page = action.payload;
        }
    }
});

export const { setCurrentPage } = currentSlice.actions;

export default currentSlice.reducer;

export const selectCurrentPage = (state: RootState) => state.current.page;