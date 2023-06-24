import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import myAxios from "../../../api/Admin/admin";

export const getStudentDetails = createAsyncThunk(
  "viewStudentsData",
  async (id) => {
    try {
      const response = await myAxios.get(`/student_details/${id}`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const checkInterviewStatus = createAsyncThunk(
  "checkInterviewStatus",
  async (id) => {
    try {
      const response = await myAxios.get(`/check_interviewstatus/${id}`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const assignInterviewer = createAsyncThunk(
  "assignInterviwer",
  async (id) => {
    try {
      const response = await myAxios.get(`/addtime_slot/${id}`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const initialState = {
  studentDetails: {},
  addTimeSlots: {},
  checkInterviewStatus: {},
};

const getStudentDetailsSlice = createSlice({
  name: "studentDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStudentDetails.pending, (state) => {})
      .addCase(getStudentDetails.fulfilled, (state, action) => {
        state.studentDetails = action?.payload;
      })
      .addCase(assignInterviewer.fulfilled, (state, action) => {
        state.addTimeSlots = action?.payload;
      })
      .addCase(checkInterviewStatus.fulfilled, (state, action) => {
        console.log(action);
        console.log("action");
        state.checkInterviewStatus = action?.payload
      })
      .addCase(getStudentDetails.rejected, (state, action) => {});
  },
});

export default getStudentDetailsSlice.reducer;
