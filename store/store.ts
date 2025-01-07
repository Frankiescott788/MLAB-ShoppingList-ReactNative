import { configureStore } from "@reduxjs/toolkit";
import ShoppingListSlice from "./lists";

const store = configureStore({
    reducer : {
        ListManagement : ShoppingListSlice.reducer
    }
});

export default store