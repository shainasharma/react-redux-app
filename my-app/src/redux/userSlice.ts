import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch users (supports search & filtering)
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({ limit = 10, skip = 0, search, filterKey, filterValue }: { 
    limit?: number; 
    skip?: number; 
    search?: string; 
    filterKey?: string; 
    filterValue?: string;
  }) => {
    let url = `https://dummyjson.com/users?limit=${limit}&skip=${skip}`;

    if (search) {
      url = `https://dummyjson.com/users/search?q=${search}`;
    } else if (filterKey && filterValue) {
      url = `https://dummyjson.com/users/filter?key=${filterKey}&value=${filterValue}`;
    }

    const response = await axios.get(url);
    return { users: response.data.users, total: response.data.total };
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: { data: [], loading: false, total: 0 },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.data = action.payload.users;
        state.total = action.payload.total;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
