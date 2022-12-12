import { createSlice } from "@reduxjs/toolkit";

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