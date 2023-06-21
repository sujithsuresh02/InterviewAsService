import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import myAxios from "../../../api/company/addRequestSlice.api";

export const paymentHistory = createAsyncThunk(
  "company/paymentHistory",
  async (values) => {
    try {
      const response = await myAxios.get("/subscription_history");
      console.log(response);
      console.log("reducer response");
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
export const editProfile = createAsyncThunk(
  "company/editProfile",
  async (values) => {
    try {
      const response = await myAxios.put("/profile",values);
      console.log(response);
      console.log("reducer response");
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
export const getSignupData = createAsyncThunk(
  "getcompanydetails",
  async (values) => {
    try {
      const response = await myAxios.get("/company_details");
      console.log(response);
      console.log("reducer response");
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
export const resetPasswordConfirmationMail = createAsyncThunk(
  "resetpasswordconfirmationmail",
  async ({name,email}) => {
    try {
      const response = await myAxios.post("/send_confirmationmail",{name:name,email:email});
      console.log(response);
      console.log("reducer response");
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
export const postResetPassword = createAsyncThunk(
  "resetpassword",
  async (values) => {
    try {
      const response = await myAxios.put("/reset_password",values);
      console.log(response);
      console.log("reducer response");
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const initialState = {
  paymentDetails: {},
  profileEdit:{},
  getSignupData:{},
  emailResponse:{},
  resetPassword:{}
  
};

const profileSlice = createSlice({
  name: "profileSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(paymentHistory.pending, (state) => {})
      .addCase(paymentHistory.fulfilled, (state, action) => {
        console.log(action);
        console.log("action job detailss");
        state.paymentHistory=action?.payload?.paymentHistory
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        console.log(action);
        console.log("action profile detailss");
        state.profileEdit=action?.payload
      })
      .addCase(getSignupData.fulfilled, (state, action) => {
        state.getSignupData=action?.payload?.response
      })
      .addCase(resetPasswordConfirmationMail.fulfilled, (state, action) => {
        state.emailResponse=action?.payload?.response
      })
      .addCase(postResetPassword.fulfilled, (state, action) => {
        state.resetPassword=action?.payload
      })
      .addCase(paymentHistory.rejected, (state, action) => {});
  },
});

export default profileSlice.reducer;
