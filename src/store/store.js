import { configureStore } from "@reduxjs/toolkit";
import goalsSliceReducer from "../features/goalsSlice";

export const store = configureStore({
    reducer: goalsSliceReducer,
})