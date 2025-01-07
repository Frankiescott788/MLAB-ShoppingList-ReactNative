import { createSlice } from "@reduxjs/toolkit";

const ShoppingListSlice = createSlice({
    name: "shoppinglists",
    initialState: {
        lists: [],
        status: "idle",
        error: ""
    },
    reducers: {
        getLists: (state, action) => {
            console.log(action.payload);
        }
    }
});

export const { getLists } = ShoppingListSlice.actions;
export default ShoppingListSlice
 