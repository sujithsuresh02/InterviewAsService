import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import myAxios from "../../../api/Admin/admin";

export const getRequets = createAsyncThunk(
  "getRequest/Data",
  async (values) => {
    try {
      const response = await myAxios.get("/view_request", values);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const initialState = {
  AllRequests: {},
};

const getAllRequestSlice = createSlice({
  name: "adminSignup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRequets.pending, (state) => {
    
      })
      .addCase(getRequets.fulfilled, (state, action) => {
        console.log(action.payload);
        console.log("action");
        state.AllRequests=action.payload
      })
      .addCase(getRequets.rejected, (state, action) => {});
  },
});

export default getAllRequestSlice.reducer;
