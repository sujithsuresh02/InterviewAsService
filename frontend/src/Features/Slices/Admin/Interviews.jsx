import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import myAxios from "../../../api//Admin/admin";
import validateToken from "../../../api/LandingPage/Demo";
export const viewScheduledInterviews = createAsyncThunk(
  "viewAllScheduledinterviews",
  async () => {
    try {
      const response = myAxios.get("/scheduled_interviews");
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);
export const validateInterviewToken = createAsyncThunk(
  "validateInterviewToken",
  async (token) => {
    try {
      const response = validateToken.get(`/validate_interviewToken/${token}`);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);


export const cancelledInterviews = createAsyncThunk(
  "cancelledInterviews",
  async () => {
    try {
      const response = myAxios.get("/cancelled_Interviews");
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);
export const cancelInterview = createAsyncThunk(
  "cancelInterview",
  async (id) => {
    try {
      const response = await myAxios.post("/cancel_Interview", id);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const initialState = {
  getallScheduledInterviews: {},
  validateInterviewToken: {},
  cancelInterview: {},
  cancelledInterview:{}
};

const interviewSlice = createSlice({
  name: "interview",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(viewScheduledInterviews.pending, (state, action) => {});
    builder.addCase(viewScheduledInterviews.fulfilled, (state, action) => {
      state.getallScheduledInterviews = action?.payload?.data;
    });
    builder.addCase(validateInterviewToken.fulfilled, (state, action) => {
      state.validateInterviewToken = action?.payload?.data;
    });
    builder.addCase(cancelInterview.fulfilled, (state, action) => {
      state.cancelInterview = action?.payload?.data;
    });
    builder.addCase(cancelledInterviews.fulfilled, (state, action) => {
      console.log(action, "cancel intereview ");
      state.cancelledInterview = action?.payload?.data;
    });
    builder.addCase(viewScheduledInterviews.rejected, (state, action) => {});
  },
});

export default interviewSlice.reducer;
