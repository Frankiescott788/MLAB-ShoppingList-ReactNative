export interface ShoppingList {
    _id: string;
    name: string;
    quantity: string;
    emoji: string;
    isCompleted: boolean;
    updatedAt: string;
}

export interface ShoppingListState {
    lists: ShoppingList[];
    status: "idle" | "loading" | "fulfilled" | "error";
    error: string | null;
  }