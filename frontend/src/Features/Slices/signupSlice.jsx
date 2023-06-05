import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import myAxios from "../../api/authapi";
import { SignInWithGoogle } from "../../Firebase/Firebase";
export const postSignup = createAsyncThunk(
  "company/Register",
  async (values) => {
    try {
      const response = await myAxios.post("/signup", values);
      return response.data;
    } catch (error) {
      console.log(error?.response?.data?.message, "this slic eerror");
      throw error;
    }
  }
);

const initialState = {
  signupDetails: {},
};

const signupSlice = createSlice({
  name: "Signup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postSignup.pending, (state) => {})
      .addCase(postSignup.fulfilled, (state, action) => {
        state.signupDetails = action.payload;
      })
      .addCase(postSignup.rejected, (state, action) => {});
  },
});

export default signupSlice.reducer;
