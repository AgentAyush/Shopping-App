import { createSlice } from "@reduxjs/toolkit";
import { products } from "@/data/products";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: products,
    filtered: products,
  },
  reducers: {
    filterByCategory: (state, action) => {
      state.filtered = action.payload === "All"
        ? state.items
        : state.items.filter(p => p.category === action.payload);
    },
  },
});

export const { filterByCategory } = productsSlice.actions;
export default productsSlice.reducer;
