import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import myAxios from "../../../api/Admin/admin";

export const getFullDemos = createAsyncThunk(
  "getDemo/Data",
  async () => {
    try {
      const response = await myAxios.get("/view_demo");
      return response
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const initialState = {
  getDemoData: {},
};

const getDemoSlice = createSlice({
  name: "getDemo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFullDemos.pending, (state) => {
    
      })
      .addCase(getFullDemos.fulfilled, (state, action) => {
        console.log(action.payload);
        console.log("action");
        state.getDemoData=action?.payload?.data
      })
      .addCase(getFullDemos.rejected, (state, action) => {});
  },
});

export default getDemoSlice.reducer;
