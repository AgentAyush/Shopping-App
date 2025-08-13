import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { products } from "@/data/products";

interface ProductsState {
  items: typeof products;
  filtered: typeof products;
  category: string;
  search: string;
}

const initialState: ProductsState = {
  items: products,
  filtered: products,
  category: "All",
  search: "",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
      applyFilters(state);
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      applyFilters(state);
    },
  },
});

function applyFilters(state: ProductsState) {
  state.filtered = state.items.filter((p) => {
    const matchesCategory =
      state.category === "All" ||
      p.category.toLowerCase() === state.category.toLowerCase();

    const matchesSearch = p.title
      .toLowerCase()
      .includes(state.search.toLowerCase());

    return matchesCategory && matchesSearch;
  });
}

export const { setCategory, setSearch } = productsSlice.actions;
export default productsSlice.reducer;
