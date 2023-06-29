import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Demoapi from "../../../api/LandingPage/Demo";
import myAxios from "../../../api/Admin/admin";
export const becomeInterviewExpert = createAsyncThunk(
  "/demo",
  async (values) => {
    try {
      const response = await Demoapi.post("/become_interviewexpert", values);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const getAllExpertsRequest = createAsyncThunk(
  "/getAllRequest",
  async () => {
    try {
      const response = await myAxios.get("/interview_experts");
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
export const sentInterviewerEmailConfirmation = createAsyncThunk(
  "/sentconfirmationmail",
  async (email) => {
    try {
      console.log(email);
      const response = await myAxios.get(
        `/interviewer_emailconfirmation/${email}`
      );
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
export const sentInterviewerRejectionmail = createAsyncThunk(
  "/sentRejectionMail",
  async ({id,email}) => {
    try {
      const response = await myAxios.delete(`/sent_rejectionmail/${email}/${id}`, {
       
      });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
const initialState = {
  interviewExperts: [],
  getAllRequest: [],
  confirmationResponse: {},
  rejectionResponse: {},
};

const interviewExpertSlice = createSlice({
  name: "interviewExperts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(becomeInterviewExpert.pending, (state, action) => {
        console.log(action);
      })
      .addCase(becomeInterviewExpert.fulfilled, (state, action) => {
        const results = action?.payload?.data?.Tokens;
        state.interviewExperts.push(results);
      })
      .addCase(getAllExpertsRequest.fulfilled, (state, action) => {
        console.log(action,"action");
        const results = action?.payload?.data?.result;
        state.getAllRequest = results;
      })
      .addCase(sentInterviewerEmailConfirmation.fulfilled, (state, action) => {
        state.confirmationResponse = action?.payload?.data;
      })
      .addCase(sentInterviewerRejectionmail.fulfilled, (state, action) => {
        const deletedInterviewerId = action.payload?.data?.interviewerId;
        const deletedInterviewerIndex = state.getAllRequest.findIndex(
          (interviewer) => interviewer.id === deletedInterviewerId
        );
        if (deletedInterviewerIndex !== -1) {
          state.getAllRequest.splice(deletedPlanIndex, 1);
        }
      })
      .addCase(becomeInterviewExpert.rejected, (state, action) => {
        console.log(action);
      });
  },
});

export default interviewExpertSlice.reducer;
