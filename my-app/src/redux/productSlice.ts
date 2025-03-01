import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ limit, skip, search }: { limit?: number; skip?: number; search?: string }) => {
    const url = search
      ? `https://dummyjson.com/products/search?q=${search}&limit=${limit ?? 10}&skip=${skip ?? 0}`
      : `https://dummyjson.com/products?limit=${limit ?? 10}&skip=${skip ?? 0}`;

    const response = await axios.get(url);
    return { products: response.data.products, total: response.data.total };
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: { data: [], loading: false, total: 0 },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.data = action.payload.products;
        state.total = action.payload.total;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default productSlice.reducer;
