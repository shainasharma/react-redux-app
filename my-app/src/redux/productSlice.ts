import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Fetch products (supports search & filtering)
export const fetchProducts = createAsyncThunk(
  "products/fetchproducts",
  async ({ limit = 10, skip = 0, search, filterKey, filterValue }: { 
    limit?: number; 
    skip?: number; 
    search?: string; 
    filterKey?: string; 
    filterValue?: string;
  }) => {
    let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

    if (search) {
      url = `https://dummyjson.com/products/search?q=${search}`;
    } else if (filterKey && filterValue) {
      url = `https://dummyjson.com/products/filter?key=${filterKey}&value=${filterValue}`;
    }

    const response = await axios.get(url);
    return { products: response.data.products, total: response.data.total };
  }
);

const productSlice = createSlice({
  name: "users",
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
