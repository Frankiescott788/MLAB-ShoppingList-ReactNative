import { db } from "@/db/db";
import { ShoppingList } from "@/types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchLists = createAsyncThunk("/lists", async () => {
    const data = (await db).getAllSync(`SELECT * FROM shoplistapp`);
    return data;
});


export const addList = createAsyncThunk("/list", async (data : ShoppingList) => {
    (await db).runAsync(`INSERT INTO shoplistapp (_id, name, quantity, emoji, isCompleted, updatedAt) VALUES (?, ?, ?, ?, ?, ?)`, data._id, data.name, data.quantity, data.emoji, data.isCompleted, data.updatedAt);
    const update_ui : ShoppingList= {
        _id : data._id,
        name : data.name,
        emoji : data.emoji,
        quantity : data.quantity,
        isCompleted : data.isCompleted,
        updatedAt : data.updatedAt
    };
    return update_ui
});


export const UpdateList = createAsyncThunk("/list/:id", async ( data : ShoppingList ) => {
    (await db).runAsync(`UPDATE shoplistapp SET name = ?, quantity = ?, emoji = ?, isCompleted = ?, updatedAt = ? WHERE _id = ?`, data.name, data.quantity, data.emoji, data.isCompleted, data.updatedAt, data._id);
    const update_ui : ShoppingList= {
        _id : data._id,
        name : data.name,
        emoji : data.emoji,
        quantity : data.quantity,
        isCompleted : data.isCompleted,
        updatedAt : data.updatedAt
    };
    return update_ui
});

export const deleteList = createAsyncThunk("/list/delete/:id", async (id: string) => {
    await (await db).runAsync(`DELETE FROM shoplistapp WHERE _id = ?`, id);
    return id;
});


const ShoppingListSlice = createSlice({
        name: "shoppinglists",
        initialState: {
            lists: <ShoppingList[]>[],
            status: "idle",
            error: ""
        },
        reducers: {},
        extraReducers : builder => {
            builder.addCase(fetchLists.pending, (state) => {
                state.status = "Loading"
            }),
            builder.addCase(fetchLists.fulfilled, (state, action) => {
                if(action.payload) {
                    state.lists = action.payload as ShoppingList[];
                    state.status = "fulfilled"
                };
            }),
            builder.addCase(fetchLists.rejected, (state, action) => {
                state.status = "error"; 
                state.error = "error"
                console.log(action.error.message)
            }),
            builder.addCase(addList.pending, (state) => {
                state.status = "Loading"
            });
            builder.addCase(addList.fulfilled, (state, action) => {
                if(action.payload) {
                    state.lists = [...state.lists, action.payload];
                    state.status = "fulfilled";
                    console.log(action.payload);
                };
            }),
            builder.addCase(addList.rejected, (state) => {
                state.status = "error"; 
                state.error = "error"
            })
            builder.addCase(UpdateList.pending, (state) => {
                state.status = "Loading";
            })
        }
});

export default ShoppingListSlice
 