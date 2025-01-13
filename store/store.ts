import { configureStore } from "@reduxjs/toolkit";
import ShoppingListSlice from "./lists";

const store = configureStore({
    reducer : {
        ListManagement : ShoppingListSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;