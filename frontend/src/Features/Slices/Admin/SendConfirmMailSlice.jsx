import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
 import myAxios from "../../../api/Admin/admin";

export const emailConfirmation = createAsyncThunk(
  "sendconfirm/email",
  async (email) => {
      try {
        console.log(email);
      const response = await myAxios.get(`/confirm_mail/${email}`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const initialState = {
  mailresponse: {},
};

const sendEmailSlice = createSlice({
  name: "emailConfirmation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(emailConfirmation.pending, (state) => {
    
      })
      .addCase(emailConfirmation.fulfilled, (state, action) => {
        console.log(action.payload);
        console.log("action");
        state.mailresponse=action?.payload
      })
      .addCase(emailConfirmation.rejected, (state, action) => {});
  },
});

export default sendEmailSlice.reducer;
