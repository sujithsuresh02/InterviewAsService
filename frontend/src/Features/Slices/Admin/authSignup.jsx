import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import myAxios from "../../../api/Admin/auth"

export const adminSignup = createAsyncThunk(
  "admin/Register",
  async (values) => {
    try {
      const response = await myAxios.post("/signup", values);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const initialState = {
  adminSignupDetails: {},
};

const adminSignupSlice = createSlice({
  name: "adminSignup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(adminSignup.pending, (state) => {
    
      })
      .addCase(adminSignup.fulfilled, (state, action) => {
    
        state.adminSignupDetails = action.payload;
      })
      .addCase(adminSignup.rejected, (state, action) => {});
  },
});

export default adminSignupSlice.reducer;
