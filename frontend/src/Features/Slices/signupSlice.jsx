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
    }
  }
);
export const validateSignupToken = createAsyncThunk(
  "validateSignupToken",
  async (token) => {
    try {
      const response = await myAxios.get(`/signup/${token}`,);
      return response.data;
    } catch (error) {
      console.log(error?.response?.data?.message, "this slic eerror");
    }
  }
);

const initialState = {
 SignupToken:[],
 validateSignup:[]
};

const signupSlice = createSlice({
  name: "Signup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postSignup.pending, (state) => {})
      .addCase(postSignup.fulfilled, (state, action) => {
        console.log(action,"signup action");
        state.SignupToken.push(action.payload?.result)
      })
      .addCase(validateSignupToken.fulfilled, (state, action) => {
        console.log(action,"signup action");
        state.validateSignup.push(action.payload?.validationToken)
      })
      .addCase(postSignup.rejected, (state, action) => {});
  },
});

export default signupSlice.reducer;
