import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import myAxios from "../../api/authapi";

export const postLogin = createAsyncThunk("login", async (values) => {
  try {
    const response = await myAxios.post("/login",  values);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const initialState = {
  loginDetails:[],
  refreshToken:null,
  accessToken:null
};

const loginSlice = createSlice({
  name: "login",
  initialState, 
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postLogin.pending, (state) => {

      })
      .addCase(postLogin.fulfilled, (state, action) => {
        state.loginDetails = action.payload.loggedInDetails;
        state.refreshToken= action.payload.loggedInDetails.matchedAccount.refreshToken;
        state.accessToken= action.payload.loggedInDetails.matchedAccount.accessToken
      })
      .addCase(postLogin.rejected, (state, action) => {
      });
  },
});

export default loginSlice.reducer;
