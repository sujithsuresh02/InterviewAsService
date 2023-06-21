import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import addtimeslotapi from "../../../api/Interviwer/Interviwer";

export const addAvabilityTimeSlot = createAsyncThunk(
  "Interviwer/addtimeslot",
  async (values) => {
    try {
      const response = await addtimeslotapi.post("/addtime_slot", values);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
export const getAllInterviewerAvailableTime = createAsyncThunk(
  "getAllAvilableTimeslot",
  async (values) => {
    try {
      const response = await addtimeslotapi.get("/view_timeslots", values);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
export const getAllScheduledInterviews = createAsyncThunk(
  "getinterviews",
  async () => {
    try {
      const response = await addtimeslotapi.get("/view_interviews");
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
export const updateFeedback = createAsyncThunk(
  "updatefeedback",
  async (values) => {
    try {
      const response = await addtimeslotapi.put("/add_feedback", values);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
export const homepageInterviewListing = createAsyncThunk(
  "interviewlisting",
  async (values) => {
    try {
      const response = await addtimeslotapi.get("/daily_interviews", values);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
export const completedInterviews = createAsyncThunk(
  "completedInterviews",
  async () => {
    try {
      const response = await addtimeslotapi.get("/completed_Interviews");
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
export const getInterviewerDetails = createAsyncThunk(
  "interviewerdetails",
  async () => {
    try {
      const response = await addtimeslotapi.get("/interviewer_Details");
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
export const editProfile = createAsyncThunk("editProfile", async (values) => {
  try {
    const response = await addtimeslotapi.put("/edit_profile", values);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
});


const initialState = {
  addTimeSlot: {},
  getallTimeslots: {},
  interviewerScheduledInterviews: {},
  updateFeedback: {},
  datewiseInterviews: {},
  completedInterveiws: {},
  interviewerDetails: {},
  editProfile: {},
};

const InterviwerSlice = createSlice({
  name: "interviwer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAvabilityTimeSlot.pending, (state, action) => {
        console.log(action);
      })
      .addCase(addAvabilityTimeSlot.fulfilled, (state, action) => {
        state.addTimeSlot = action?.payload?.data;
      })
      .addCase(getAllInterviewerAvailableTime.fulfilled, (state, action) => {
        state.getallTimeslots = action?.payload?.data;
      })
      .addCase(getAllScheduledInterviews.fulfilled, (state, action) => {
        state.interviewerScheduledInterviews = action?.payload?.data;
      })
      .addCase(updateFeedback.fulfilled, (state, action) => {
        state.updateFeedback = action?.payload?.data;
      })
      .addCase(homepageInterviewListing.fulfilled, (state, action) => {
        state.datewiseInterviews = action?.payload?.data;
      })
      .addCase(completedInterviews.fulfilled, (state, action) => {
        state.completedInterveiws = action?.payload?.data;
      })
      .addCase(getInterviewerDetails.fulfilled, (state, action) => {
        state.interviewerDetails = action?.payload?.data;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.editProfile = action?.payload?.data;
      })
     
      .addCase(addAvabilityTimeSlot.rejected, (state, action) => {
        console.log(action);
      });
  },
});

export default InterviwerSlice.reducer;
