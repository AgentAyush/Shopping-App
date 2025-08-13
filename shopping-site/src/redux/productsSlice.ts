import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { products } from "@/data/products";

interface ProductsState {
  items: typeof products;
  filtered: typeof products;
  category: string;
  search: string;
  minPrice: number;
  maxPrice: number;
}

const initialState: ProductsState = {
  items: products,
  filtered: products,
  minPrice: 0,
  maxPrice: 1000,
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
    setPriceRange: (state, action: PayloadAction<{ min: number; max: number }>) => {
      state.minPrice = action.payload.min;
      state.maxPrice = action.payload.max;
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

    const matchesPrice = p.price >= state.minPrice && p.price <= state.maxPrice;

    return matchesCategory && matchesSearch && matchesPrice;
  });
}

export const { setCategory, setSearch, setPriceRange } = productsSlice.actions;
export default productsSlice.reducer;
