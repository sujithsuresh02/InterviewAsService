import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import myAxios from "../../api/authapi";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const postLogin = createAsyncThunk("login", async (values) => {
  try {
    const response = await myAxios.post("/login", values);
    return response;
  } catch (error) {
   
    toast.error(error?.response?.data?.message)
    throw error;
  }
});

export const googleSignIn = createAsyncThunk(
  'users/googleSignIn',
  async (payload) => {
    try {
      const response = await myAxios.post('/sign_in_with_google', payload);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
export const forgotPassword = createAsyncThunk(
  'forgotPassword',
  async (email) => {
    try {
      const response = await myAxios.post('/enter_email', email);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
export const changePassword = createAsyncThunk(
  'changePassword',
  async (payload) => {
    try {
      console.log(payload,"payload");
      const response = await myAxios.post('/changepassword',payload);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const validateChangepasswordPage = createAsyncThunk(
  'validateChangepasswordPage',
  async (payload) => {
    try {
      const response = await myAxios.get(`/validate_forgotpassword/${payload}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);


const initialState = {
  loginDetails: [],
  refreshToken: null,
  accessToken: null,
  forgotPassword:{},
  changePassword:{},
  changePasswordValidation:[]
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      
    },
  //   updateAccessToken : (state,action)=>{
  //     console.log(action,"action in resposne");
  //     state.accessToken=action.payload
  //     },
  // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postLogin.pending, (state) => {})
      .addCase(postLogin.fulfilled, (state, action) => {
        console.log(action?.payload);
        console.log("action");
        state.loginDetails = action?.payload?.data?.loggedInDetails;
        state.refreshToken =
          action?.payload?.data?.loggedInDetails?.refreshToken;
        state.accessToken = action?.payload?.data?.loggedInDetails?.accessToken;
      })
      .addCase(googleSignIn.fulfilled,(state,action)=>{
        console.log(action?.payload);
        console.log("action googglr sign in");
        state.loginDetails = action?.payload?.data?.loggedInDetails;
        state.refreshToken =
          action?.payload?.data?.loggedInDetails?.refreshToken;
        state.accessToken = action?.payload?.data?.loggedInDetails?.accessToken;
      })
      .addCase(forgotPassword.fulfilled,(state,action)=>{
        state.forgotPassword=action?.payload?.data
      })
      .addCase(changePassword.fulfilled,(state,action)=>{
        state.changePassword=action?.payload?.data
      })
      .addCase(validateChangepasswordPage.fulfilled,(state,action)=>{
        console.log(action,"action")
        state.changePasswordValidation.push(action?.payload?.response)
      })
      .addCase(postLogin.rejected, (state, action) => {});
  },
}); 

export   const  {logout }= loginSlice.actions
export default loginSlice.reducer;
