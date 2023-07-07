import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import myAxios from "../../api/authapi";
import landingApi from "../../api/LandingPage/Demo"
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

export const validateInterviewerSignup= createAsyncThunk("validate_interviewer",async(token)=>{

  const response= await myAxios.get(`/validate_interviewer/${token}`)
  return response
})

const initialState = {
 SignupToken:[],
 validateSignup:[],
 validateInterviewerSignup:[],
 isLoading:false
};

const signupSlice = createSlice({
  name: "Signup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postSignup.pending, (state) => {
        state.isLoading=true
      })
      .addCase(postSignup.fulfilled, (state, action) => {
        console.log(action,"signup action");
        state.isLoading=false
        state.SignupToken.push(action.payload?.result)
      })
      .addCase(validateSignupToken.fulfilled, (state, action) => {
        console.log(action,"signup action");
        state.validateSignup?.push(action?.payload)
      })
      .addCase(validateInterviewerSignup.fulfilled, (state, action) => {
        console.log(action,"signup action");
        state.validateInterviewerSignup?.push(action?.payload?.data)
      })
      .addCase(postSignup.rejected, (state, action) => {
        state.isLoading=false
      });
  },
});

export default signupSlice.reducer;
