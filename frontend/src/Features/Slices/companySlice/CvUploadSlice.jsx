import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import myAxios from "../../../api/company/addRequestSlice.api";

export const cvUpload = createAsyncThunk("company/cvUpload", async (values) => {
  try {
    console.log(values);
    const response = await myAxios.post("/upload_cv", values);
    console.log(response);
    console.log("reducer response");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const initialState = {
  CvCount: {},
  isLoading:false
};

const cvUploadSlice = createSlice({
  name: "cvUpload",
  initialState,
  reducers: {
    resetUploadedCvCount: (state) => {
      return {
        ...state,
        CvCount: {
          ...state.CvCount,
          TotalUploadedCv: {
            uploadedCVsCount: 0,
            TotalStudentsCount: null,
          },
        },
      };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(cvUpload.pending, (state) => {
        state.isLoading=true;
      })
      .addCase(cvUpload.fulfilled, (state, action) => {
        console.log(action);
        console.log("action cv");
        state.isLoading=false
        state.CvCount = action.payload;
      })
      .addCase(cvUpload.rejected, (state, action) => {});
  },
});
export const { resetUploadedCvCount } = cvUploadSlice.actions;
export default cvUploadSlice.reducer;
