import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import myAxios from "../../../api/Admin/auth";

export const adminPostLogin = createAsyncThunk("admin/login", async (values) => {
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
  loginDetails:{},
  refreshToken:"",
  accessToken:"",
  status:{}
};

const adminLoginSlice = createSlice({
  name: "adminLogin",
  initialState, 
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(adminPostLogin.pending, (state) => {

      })
      .addCase(adminPostLogin.fulfilled, (state, action) => {
        console.log(action);
        state.loginDetails = action.payload.loggedInDetails.matchedAccount;
        state.refreshToken= action.payload.loggedInDetails.refreshToken;
        state.accessToken= action.payload.loggedInDetails.accessToken;
        state.status= action.payload.status;

      })
      .addCase(adminPostLogin.rejected, (state, action) => {
      });
  },
});

export default adminLoginSlice.reducer;
