import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import myAxios from "../../../api/Admin/admin";

export const getAllTimeSlots = createAsyncThunk(
  "getallTimeScheduleData",
  async () => {
    try {
      const response = await myAxios.get("/timeslot_details");
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
export const postAssignInterviewer = createAsyncThunk(
  "AssignInterviewer",
  async (values) => {
    try {
      console.log(values,"cfbdvfkjndng")
      const response = await myAxios.post("/assign_interview",values);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const initialState = {
  addTimeSlotData: {},
  interviewsToken:[]
};

const addTimeslotSlice = createSlice({
  name: "addtimeslot",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTimeSlots.pending, (state) => {})
      .addCase(getAllTimeSlots.fulfilled, (state, action) => {
        state.addTimeSlotData = action?.payload;
      })
      .addCase(postAssignInterviewer.fulfilled, (state, action) => {
        console.log(action,"from assign interviewer");
        state.interviewsToken.push(action?.payload?.interviewToken)
      })
      .addCase(getAllTimeSlots.rejected, (state, action) => {});
  },
});

export default addTimeslotSlice.reducer;
