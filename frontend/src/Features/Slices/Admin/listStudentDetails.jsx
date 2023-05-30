import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import myAxios from "../../../api/Admin/admin";

export const getStudentDetails = createAsyncThunk(
  "viewStudentsData",
  async (id) => {
    try {
      const response = await myAxios.get("/student_details/${id}");
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
};

const getStudentDetailsSlice = createSlice({
  name: "studentDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStudentDetails.pending, (state) => {
    
      })
      .addCase(getStudentDetails.fulfilled, (state, action) => {
        console.log(action.payload);
        console.log("action");
        state.studentDetails=action.payload
      })
      .addCase(getStudentDetails.rejected, (state, action) => {});
  },
});

export default getStudentDetailsSlice.reducer;
